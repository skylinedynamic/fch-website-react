import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // On AWS, Nginx handles SSL termination and HTTP→HTTPS redirects.
  // Next.js middleware should NOT redirect here — doing so creates an infinite
  // redirect loop because Nginx always forwards requests to Next.js over HTTP internally,
  // meaning x-forwarded-proto will always appear as 'http' to this middleware.
  //
  // Simply pass the request through and attach security headers.
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
