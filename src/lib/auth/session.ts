import "server-only";
import { cookies } from "next/headers";

const COOKIE_NAME = "access_token";

export async function setSessionCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days — matches token exp
    });
}

export async function getSessionCookie() {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value;
}

export async function clearSessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}
