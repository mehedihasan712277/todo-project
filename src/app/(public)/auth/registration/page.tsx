"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
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
import { registerAction, type ActionResult } from "@/actions/auth.actions";

const initialState: ActionResult = { success: false, message: "" };

const RegisterPage = () => {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(
        registerAction,
        initialState,
    );

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmError, setConfirmError] = useState<string>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        if (!value) setConfirmError("Please confirm your password.");
        else if (value !== password) setConfirmError("Passwords do not match.");
        else setConfirmError(undefined);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Create an account
                    </CardTitle>
                    <CardDescription>
                        Enter your details below to register.
                    </CardDescription>
                </CardHeader>
                <form action={formAction} noValidate>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                            />
                            {state.errors?.name && (
                                <p className="text-sm text-destructive">
                                    {state.errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                            />
                            {state.errors?.email && (
                                <p className="text-sm text-destructive">
                                    {state.errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((p) => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    tabIndex={-1}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {state.errors?.password && (
                                <p className="text-sm text-destructive">
                                    {state.errors.password}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        handleConfirmPasswordChange(
                                            e.target.value,
                                        )
                                    }
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword((p) => !p)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    tabIndex={-1}
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {confirmError && (
                                <p className="text-sm text-destructive">
                                    {confirmError}
                                </p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 mt-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={
                                isPending || !!confirmError || !confirmPassword
                            }
                        >
                            {isPending ? "Creating account..." : "Register"}
                        </Button>
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href="/auth/login"
                                className="text-primary underline-offset-4 hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default RegisterPage;
