import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
 
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;
          const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
          if (isOnDashboard) {
            if (isLoggedIn) return true;
            console.log("noLoggedId", nextUrl)
            console.log(new URL('/dashboard', nextUrl))
            return false; // Redirect unauthenticated users to login page
          } else if (isLoggedIn) {
            console.log("isLoggedIN", nextUrl)
            console.log(new URL('/dashboard', nextUrl))
            return NextResponse.redirect(new URL('/dashboard', nextUrl));
          }
          return true;
        },
      },
    providers: []
} satisfies NextAuthConfig;