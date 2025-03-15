import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
 
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;
          const isOnDashboard = nextUrl?.pathname.startsWith('/dashboard');
            // Construct the base URL dynamically
            const baseUrl =  process.env.AUTH_URL || nextUrl?.origin;
            console.log("base",baseUrl);
            
          if (isOnDashboard) {
            if (isLoggedIn) return true;
            console.log("Not Logged In, Redirecting to Login:", baseUrl?.toString());
            return false; // Redirect unauthenticated users to login page
          } else if (isLoggedIn) {
            console.log("User is Logged In, Redirecting to Dashboard:", baseUrl.toString());
            return NextResponse.redirect(new URL('/dashboard', baseUrl));
          }
          return true;
        },
      },
    providers: []
} satisfies NextAuthConfig;