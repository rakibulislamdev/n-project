import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user is trying to access the dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const userCookie = request.cookies.get('user')?.value;
    
    // If no user cookie is found, redirect to login page
    if (!userCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const user = JSON.parse(userCookie);
      
      // Check for strict role and email requirement
      if (user.role !== 'SUPER_ADMIN' || user.email !== 'nader@transseas.com') {
        // Redirect unauthorized users to the login page
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      // If there's an error parsing the cookie, redirect to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*'],
};
