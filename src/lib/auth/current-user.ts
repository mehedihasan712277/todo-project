import "server-only";
import { getSessionCookie } from "./session";
import { verifyAccessToken } from "./paseto";

export async function getCurrentUser() {
    const token = await getSessionCookie();
    if (!token) return null;

    try {
        return await verifyAccessToken(token);
    } catch {
        // token missing, expired, or tampered with
        return null;
    }
}
