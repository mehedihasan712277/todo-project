"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { loginAction, type ActionResult } from "@/actions/auth.actions";

const initialState: ActionResult = { success: false, message: "" };

const LogInPage = () => {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(
        loginAction,
        initialState,
    );

    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
            router.push(
                state.role === "admin" ? "/admin/overview" : "/user/todos",
            );
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Log In</CardTitle>
                    <CardDescription>
                        Enter your email and password to access your account.
                    </CardDescription>
                </CardHeader>
                <form action={formAction}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 mt-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? "Logging in..." : "Log In"}
                        </Button>
                        <p className="text-sm text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/auth/registration"
                                className="text-primary underline-offset-4 hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default LogInPage;
