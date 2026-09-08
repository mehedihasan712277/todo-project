import { encrypt, decrypt } from "paseto-ts/v4";

const LOCAL_KEY = process.env.PASETO_LOCAL_KEY!;

export interface AccessTokenPayload {
    sub: string;
    email: string;
    role: "user" | "admin";
}

export async function createAccessToken(payload: AccessTokenPayload) {
    return encrypt(LOCAL_KEY, {
        ...payload,
        exp: "7 days", // exp is a payload claim, not an options field
    });
}

export async function verifyAccessToken(token: string) {
    const { payload } = await decrypt<AccessTokenPayload>(LOCAL_KEY, token);
    return payload;
}
