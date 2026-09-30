import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isAdminRole(role?: string | null): boolean {
  if (!role) return false;
  const upper = role.toUpperCase().trim();
  return upper === 'ADMIN' || upper === 'SUPER_ADMIN' || upper.includes('ADMIN');
}

function parseUserCookie(cookieValue?: string) {
  if (!cookieValue) return null;
  try {
    return JSON.parse(cookieValue);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userCookie = request.cookies.get('user')?.value;
  const token = request.cookies.get('accessToken')?.value;
  const user = parseUserCookie(userCookie);
  
  const isAuthenticated = Boolean(token || user);
  const isAdmin = Boolean(user && isAdminRole(user.role));

  // 1. If already logged in, prevent visiting login
  if (pathname === '/login') {
    if (isAuthenticated) {
      // If admin, go to dashboard. If normal user, go to home.
      const destination = isAdmin ? '/dashboard' : '/';
      return NextResponse.redirect(new URL(destination, request.url));
    }
    return NextResponse.next();
  }

  // 2. Strict Dashboard Protection: Admin ONLY
  if (pathname.startsWith('/dashboard')) {
    // If not logged in at all, redirect to login
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If logged in but NOT an admin, block access and redirect to home
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Matching Paths
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
