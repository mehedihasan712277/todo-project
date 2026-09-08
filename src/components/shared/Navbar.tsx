"use client";
import Link from "next/link";
import { ModeToggle } from "./ThemeSwitcher";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/components/provider/AuthProvider";

const Navbar = () => {
    const { user } = useAuth();

    return (
        <div className="py-6 px-4 flex justify-between items-center border-b fixed w-screen bg-transparent backdrop-blur-2xl">
            <p className="font-bold">MyTodo</p>
            <div className="flex items-center gap-4">
                <Link href="/">Home</Link>

                {!user ? (
                    <div className="flex gap-4">
                        <Link href="/auth/login">Login</Link>
                        <Link href="/auth/registration">Register</Link>
                    </div>
                ) : (
                    <>
                        {user.role === "admin" ? (
                            <>
                                <Link href="/admin/overview">Overview</Link>
                                <Link href="/admin/users">Users</Link>
                            </>
                        ) : (
                            <>
                                <Link href="/user/profile">Profile</Link>
                                <Link href="/user/todos">Todos</Link>
                            </>
                        )}
                        <span className="text-sm text-muted-foreground">
                            {user.email} ({user.role})
                        </span>
                        <LogoutButton />
                    </>
                )}
                <ModeToggle></ModeToggle>
            </div>
        </div>
    );
};

export default Navbar;
