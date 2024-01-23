
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from 'next/server'

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // Redirect non-logged-in users to the sign-in route if they try to access a protected route
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Allow all logged-in users to access every route
    if (auth.userId) {
      return NextResponse.next();
    }

    // For non-logged-in users, allow access only to the "/" route
    if (!auth.userId && auth.isPublicRoute && req.url === "/") {
      return NextResponse.next();
    }

    // Redirect non-logged-in users to the sign-in route for other routes
    return redirectToSignIn({ returnBackUrl: req.url });
  },
});
