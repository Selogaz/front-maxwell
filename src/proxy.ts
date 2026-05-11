import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/api/character-builder/') ||
    request.nextUrl.pathname.startsWith('/api/auth/') ||
    request.nextUrl.pathname.startsWith('/api/character') ||
    request.nextUrl.pathname.startsWith('/api/me')
  ) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.delete('origin');
    return NextResponse.rewrite(request.nextUrl, {
      request: { headers: requestHeaders },
    });
  }
}

export const config = {
  matcher: [
    '/api/character-builder/:path*',
    '/api/auth/:path*',
    '/api/character',
    '/api/me',
  ],
};
