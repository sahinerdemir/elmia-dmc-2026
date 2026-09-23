import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isCrmPath = request.nextUrl.pathname.startsWith('/crm');
  const isLoginPath = request.nextUrl.pathname === '/crm/login';
  const isApiAuthPath = request.nextUrl.pathname.startsWith('/api/crm/auth');

  // Skip middleware for the auth API route itself
  if (isApiAuthPath) {
    return NextResponse.next();
  }

  if (isCrmPath) {
    const sessionCookie = request.cookies.get('elmia_crm_session')?.value;
    const isAuthenticated = sessionCookie === 'elmia_authenticated_session_token_2026';

    // If accessing a protected CRM route but not authenticated, redirect to login
    if (!isLoginPath && !isAuthenticated) {
      return NextResponse.redirect(new URL('/crm/login', request.url));
    }

    // If authenticated and trying to access the login page, redirect to dashboard
    if (isLoginPath && isAuthenticated) {
      return NextResponse.redirect(new URL('/crm', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/crm/:path*', '/api/crm/:path*'],
};
