
import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs"



export default authMiddleware({
  // routes that don't require authentication
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
 ,  "/auth",
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
      return NextResponse.next()
    }

    const url = new URL(req.nextUrl.origin)

    if (!auth.userId && !auth.isPublicRoute) {
      // if the user tries to access a private route without being authenticated,
      // redirect to login page
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
  },
})

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
};
