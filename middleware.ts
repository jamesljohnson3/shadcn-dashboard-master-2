import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/terms-conditions",
    "/signup(.*)",
    "/signin(.*)",
    "/register",
    "/demo",
    "/sites(.*)",
    "/site(.*)",
    "/home(.*)",
    "/post(.*)",
    "/welcome",
    "/auth",
    "/sign-up(.*)",
    "/sign-in(.*)",
    "/login",
    "/dashboard(.*)",
    "/p(.*)",
    "/"
  ],

  afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      // do nothing for public routes
      return;
    }

    const url = new URL(req.nextUrl.origin);

    if (!auth.userId && !auth.isPublicRoute) {
      // if the user tries to access a private route without being authenticated,
      // redirect to login page
      url.pathname = "/login";
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && !auth.isPublicRoute) {
      // if the user is logged in and trying to access a protected route,
      // allow them to access the route
      return;
    }

    // All other cases (e.g., not logged in but accessing a public route)
    // can be handled as needed
  },
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
};
