
import { NextResponse } from 'next/server'
// middleware.ts

import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"], // Allow access to the "/" route for all users
  
  afterAuth(auth, req, evt) {
    // Allow all logged-in users to access every route
    if (auth.userId) {
      return NextResponse.next();
    }

    // Redirect non-logged-in users to the sign-in route for other routes
    return redirectToSignIn({ returnBackUrl: req.url });
  },
});
