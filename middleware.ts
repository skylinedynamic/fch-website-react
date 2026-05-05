import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');

  // 1. Skip middleware for local development
  if (!hostname || hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return NextResponse.next();
  }

  // 2. Protocol and WWW detection
  // Use x-forwarded-proto as the source of truth for protocol behind a proxy (like AWS ELB/ALB)
  const xForwardedProto = request.headers.get('x-forwarded-proto');
  const isHttp = xForwardedProto === 'http';
  const isWww = hostname.startsWith('www.');

  // 3. Force HTTPS and Handle Non-WWW redirect
  if (isWww || isHttp) {
    const newHostname = hostname.replace(/^www\./, '');
    const protocol = 'https';
    const newUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, `${protocol}://${newHostname}`);

    // Using a 301 for SEO, but ensuring it's not applied if we're already at the correct destination
    // to avoid infinite loops in misconfigured proxy environments
    if (newUrl.toString() !== request.url) {
      const response = NextResponse.redirect(newUrl, 301);

      // Security headers
      response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      // Prevent clickjacking but allow same origin iframes
      response.headers.set('X-Frame-Options', 'SAMEORIGIN');

      return response;
    }
  }

  // 4. Add security headers to all other successful responses
  const response = NextResponse.next();
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
