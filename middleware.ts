
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from 'next/server'

export default authMiddleware({
  // Specify routes that should be accessible without authentication
  publicRoutes: ["/", "/login"],

  // This function is called after the authentication middleware is executed
  afterAuth(auth, req, evt) {
    // Allow all logged-in users to access every route
    if (auth.userId) {
      return NextResponse.next();
    }

    // Redirect non-logged-in users to the sign-in route for other routes
    return redirectToSignIn({ returnBackUrl: req.url });
  },
});
