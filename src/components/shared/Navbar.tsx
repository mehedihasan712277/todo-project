"use client";
import Link from "next/link";
import { ModeToggle } from "./ThemeSwitcher";
import { useState } from "react";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    return (
        <div className="py-6 px-4 flex justify-between border-b">
            <p className="font-bold">MyTodo</p>
            <div className="flex items-center gap-4">
                <Link href="/">Home</Link>

                {isLoggedIn ? (
                    <div className="flex gap-4">
                        <Link href="/auth/login">Login</Link>
                        <Link href="/auth/registration">Register</Link>
                    </div>
                ) : (
                    <Link href={isAdmin ? "/admin/overview" : "/user/profile"}>
                        Dashboard
                    </Link>
                )}
                <ModeToggle></ModeToggle>
            </div>
        </div>
    );
};

export default Navbar;
