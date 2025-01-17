import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const loginToken =
    request.cookies.get("__Secure-authjs.session-token") ||
    request.cookies.get("authjs.session-token");
  const passwordToken = new URL(request.url).searchParams.get("token");
  const verifyEmail = new URL(request.url).searchParams.get("email");

  if (!passwordToken && request.nextUrl.pathname === "/reset-password") {
    return NextResponse.redirect(new URL("/forgot", request.url), {
      status: 302,
    });
  }

  if (!verifyEmail && request.nextUrl.pathname === "/verify") {
    return NextResponse.redirect(new URL("/register", request.url), {
      status: 302,
    });
  }

  if (
    !loginToken &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register")
  ) {
    return NextResponse.next();
  }

  if (
    loginToken &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register" ||
      request.nextUrl.pathname === "/login?error=unauthorized")
  ) {
    return NextResponse.redirect(new URL("/", request.url), { status: 302 });
  }

  if (
    !loginToken &&
    (request.nextUrl.pathname === "/checkout" ||
      request.nextUrl.pathname === "/my-orders" ||
      request.nextUrl.pathname.startsWith("/order-details") ||
      request.nextUrl.pathname === "/profile" ||
      request.nextUrl.pathname === "/admin")
  ) {
    return NextResponse.redirect(new URL("/login", request.url), {
      status: 302,
    });
  }

  return NextResponse.next();
}
