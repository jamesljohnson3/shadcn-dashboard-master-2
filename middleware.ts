
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from 'next/server'

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // Allow all logged-in users to access every route
    if (auth.userId) {
      return NextResponse.next();
    }

    // For non-logged-in users, allow access to "/" and "/login" routes
    if (!auth.userId && auth.isPublicRoute && (req.url === "/" || req.url === "/login")) {
      return NextResponse.next();
    }

    // Redirect non-logged-in users to the sign-in route for other routes
    return redirectToSignIn({ returnBackUrl: req.url });
  },
});
