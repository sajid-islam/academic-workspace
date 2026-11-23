import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_tknx")?.value;

  const { pathname } = request.nextUrl;

  // No token → redirect to login
  if (!accessToken && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Has token → prevent accessing login
  if (accessToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
