import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  const url = request.nextUrl.clone();

  // 1. Skip middleware for local development
  if (!hostname || hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return NextResponse.next();
  }

  // 2. Force HTTPS and Handle WWW to Non-WWW redirect (Canonicalization)
  const isWww = hostname.startsWith('www.');
  const isHttp = request.headers.get('x-forwarded-proto') === 'http';

  if (isWww || isHttp) {
    const newHostname = hostname.replace(/^www\./, '');
    const protocol = 'https';
    const newUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, `${protocol}://${newHostname}`);
    
    const response = NextResponse.redirect(newUrl, 301);
    
    // Add HSTS (Strict-Transport-Security)
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    return response;
  }

  // 3. Add HSTS to all other successful responses
  const response = NextResponse.next();
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
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
