"use server";

import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createAccessToken } from "@/lib/auth/paseto";
import { setSessionCookie, clearSessionCookie } from "@/lib/auth/session";

export interface ActionResult {
    success: boolean;
    message: string;
    errors?: Record<string, string>;
    role?: "user" | "admin";
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function registerAction(
    _prevState: ActionResult,
    formData: FormData,
): Promise<ActionResult> {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "")
        .trim()
        .toLowerCase();
    const password = String(formData.get("password") ?? "");

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!emailRegex.test(email))
        errors.email = "Please enter a valid email address.";
    if (!password) errors.password = "Password is required.";
    else if (password.length < 6)
        errors.password = "Password must be at least 6 characters.";

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            message: "Please fix the errors below.",
            errors,
        };
    }

    const existing = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (existing) {
        return {
            success: false,
            message: "An account with this email already exists.",
            errors: { email: "Email already in use." },
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
        .insert(users)
        .values({ name, email, password: hashedPassword })
        .returning({ id: users.id, email: users.email, role: users.role });

    const token = await createAccessToken({
        sub: newUser.id,
        email: newUser.email,
        role: newUser.role,
    });

    await setSessionCookie(token);

    return {
        success: true,
        message: "Registration successful!",
        role: newUser.role,
    };
}

export async function loginAction(
    _prevState: ActionResult,
    formData: FormData,
): Promise<ActionResult> {
    const email = String(formData.get("email") ?? "")
        .trim()
        .toLowerCase();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
        return { success: false, message: "Email and password are required." };
    }

    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (!user) {
        return { success: false, message: "Invalid email or password." };
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
        return { success: false, message: "Invalid email or password." };
    }

    const token = await createAccessToken({
        sub: user.id,
        email: user.email,
        role: user.role,
    });

    await setSessionCookie(token);

    return {
        success: true,
        message: "Logged in successfully!",
        role: user.role,
    };
}

export async function logoutAction() {
    await clearSessionCookie();
}
