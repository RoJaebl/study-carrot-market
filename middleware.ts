import { MiddlewareConfig, NextRequest } from "next/server";
import db from "./lib/db";

export async function middleware(request: NextRequest) {
  await db.user.findMany();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
