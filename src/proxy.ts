import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/auth/paseto";

const COOKIE_NAME = "access_token";

const isUserRoute = (pathname: string) => pathname.startsWith("/user");
const isAdminRoute = (pathname: string) => pathname.startsWith("/admin");
const isAuthRoute = (pathname: string) =>
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/registration");

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(COOKIE_NAME)?.value;

    let role: "user" | "admin" | null = null;

    if (token) {
        try {
            const payload = await verifyAccessToken(token);
            role = payload.role;
        } catch {
            // expired, tampered, or malformed token — treat as logged out
            role = null;
        }
    }

    const loggedIn = role !== null;

    // Logged-in users shouldn't see login/registration — bounce to their home
    if (isAuthRoute(pathname) && loggedIn) {
        const destination =
            role === "admin" ? "/admin/overview" : "/user/todos";
        return NextResponse.redirect(new URL(destination, request.url));
    }

    // /user/* — requires login; admins get a 404, not access
    if (isUserRoute(pathname)) {
        if (!loggedIn) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
        if (role === "admin") {
            return NextResponse.rewrite(new URL("/__not-found__", request.url));
        }
    }

    // /admin/* — requires login; users get a 404, not access
    if (isAdminRoute(pathname)) {
        if (!loggedIn) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
        if (role === "user") {
            return NextResponse.rewrite(new URL("/__not-found__", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/user/:path*",
        "/admin/:path*",
        "/auth/login",
        "/auth/registration",
    ],
};
