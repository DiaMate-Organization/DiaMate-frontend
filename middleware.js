import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request) {
  try {
    // Create a response object that we can modify
    const response = NextResponse.next()
    
    // Create a Supabase client
    const supabase = createClient()

    // Refresh the session if needed
    const { data: { session }, error } = await supabase.auth.getSession()

    // Define protected routes
    const protectedRoutes = ['/dashboard', '/profile', '/settings']
    const isProtectedRoute = protectedRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route)
    )

    // Redirect to login if accessing protected route without session
    if (isProtectedRoute && !session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Redirect to dashboard if accessing auth pages while logged in
    const authRoutes = ['/login', '/register']
    const isAuthRoute = authRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route)
    )

    if (isAuthRoute && session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
  } catch (e) {
    // Handle any errors
    return NextResponse.next()
  }
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}