"use client";
import Link from "next/link";
import { ModeToggle } from "./ThemeSwitcher";
import { useState } from "react";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    return (
        <div className="py-6 px-4 flex justify-between border-b fixed w-screen bg-transparent backdrop-blur-2xl">
            <p className="font-bold">MyTodo</p>
            <div className="flex items-center gap-4">
                <Link href="/">Home</Link>

                {isLoggedIn ? (
                    <div className="flex gap-4">
                        <Link href="/auth/login">Login</Link>
                        <Link href="/auth/registration">Register</Link>
                    </div>
                ) : (
                    <>
                        {isAdmin ? (
                            <>
                                <Link href={"/admin/overview"}>Overview</Link>
                                <Link href={"/admin/users"}>User</Link>
                            </>
                        ) : (
                            <>
                                <Link href={"/user/profile"}>Profile</Link>
                                <Link href={"/user/todos"}>Todos</Link>
                            </>
                        )}
                    </>
                )}
                <ModeToggle></ModeToggle>
            </div>
        </div>
    );
};

export default Navbar;
