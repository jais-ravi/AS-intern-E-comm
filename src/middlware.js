import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = await getToken({ req });
  const url = request.nextUrl;

  if (token && 
        (   url.pathname.startsWith("/sign-up")||
            url.pathname.startsWith("/sign-in")||
            url.pathname.startsWith("/verify")||
            url.pathname.startsWith("/")
        )
    ) {
    return NextResponse.redirect(new URL("/dashboard", request.url)); //TODO: dashboard change krna h
  }

  return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/sign-in", "sign-up", "/", "dashboard/:path*", "/about/:path*"],
};
