import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeJwtPayload(token: string): any | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    const payload = decodeJwtPayload(token);
    const role = payload?.role || payload?.user?.role;
    if (role !== "admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // Prevent authenticated users from visiting auth pages
  if (pathname === "/login" || pathname === "/register") {
    const token = req.cookies.get("token")?.value;
    if (token) {
      const payload = decodeJwtPayload(token);
      const role = payload?.role || payload?.user?.role;
      const url = req.nextUrl.clone();
      url.pathname = role === "admin" ? "/admin" : "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};

