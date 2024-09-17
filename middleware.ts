import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

export async function middleware(request: NextRequest) {
  console.log("hello");
  // const pathname = request.nextUrl.pathname;
  // if (pathname === "/") {
  //   const response = NextResponse.next();
  //   response.cookies.set("middleware-cookie", "hello!");
  //   return response;
  // }
  // if (request.nextUrl.pathname === "/profile") {
  //   return Response.redirect(new URL("/", request.url));
  // }
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
