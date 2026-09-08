"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/actions/auth.actions";

const LogoutButton = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleLogout = () => {
        startTransition(async () => {
            await logoutAction();
            toast.success("Logged out successfully!");
            router.push("/");
            router.refresh(); // re-runs the root layout server-side, so AuthProvider gets user: null
        });
    };

    return (
        <Button variant="outline" onClick={handleLogout} disabled={isPending}>
            {isPending ? "Logging out..." : "Logout"}
        </Button>
    );
};

export default LogoutButton;
