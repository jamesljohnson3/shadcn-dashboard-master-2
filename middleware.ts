import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from 'next/server';

export default authMiddleware({
  // Specify routes that should be accessible without authentication
  publicRoutes: ["/", "/login", "/player",  "/signup(.*)",
  "/signin(.*)"],

  // This function is called after the authentication middleware is executed
  afterAuth(auth, req, evt) {
    // Allow all logged-in users to access every route
    if (auth.userId) {
      return NextResponse.next();
    }

    // Redirect non-logged-in users to the sign-in route for other routes
    if (!auth.userId && !auth.isPublicRoute) {
      const url = new URL(req.url);
      // if the user tries to access a private route without being authenticated,
      // redirect to login page
      url.pathname = "/login";
      return NextResponse.redirect(url.toString());
    }

    // If it's a public route or any other case, proceed
    return NextResponse.next();
  },
});
