import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes and their allowed roles
const protectedRoutes = {
  '/admin': ['ADMIN'],
  '/hospital': ['HOSPITAL_STAFF'],
  '/pharmacy': ['PHARMACY_STAFF'],
  '/vendor': ['VENDOR'],
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const userRole = request.cookies.get('user-role')?.value

  // Check if the path is protected
  const isProtectedRoute = Object.keys(protectedRoutes).some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if user has required role
    const path = Object.keys(protectedRoutes).find((route) =>
      request.nextUrl.pathname.startsWith(route)
    )
    if (path && !protectedRoutes[path as keyof typeof protectedRoutes].includes(userRole as any)) {
      // Redirect to appropriate dashboard based on role
      return NextResponse.redirect(new URL(`/${userRole?.toLowerCase()}`, request.url))
    }
  }

  // If user is logged in and tries to access login page, redirect to their dashboard
  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL(`/${userRole?.toLowerCase()}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/hospital/:path*',
    '/pharmacy/:path*',
    '/vendor/:path*',
    '/login',
  ],
} 