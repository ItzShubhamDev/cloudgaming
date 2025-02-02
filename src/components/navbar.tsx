"use client";

import Link from "next/link";
import { Cloud, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import dynamic from "next/dynamic";
const ThemeToggle = dynamic(() => import("./themeToggle"), { ssr: false });

export default function Navbar() {
    const pathname = usePathname();
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then((r) => {
            if (r.data.user) {
                setLogged(true);
            } else {
                setLogged(false);
            }
        });
    }, [pathname]);

    return (
        <nav className="bg-gray-100 dark:bg-gray-900 fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <Cloud className="h-8 w-8 text-blue-500" />
                        <span className="font-bold text-xl">CloudGaming</span>
                    </Link>

                    <div className="flex space-x-8">
                        <Link
                            href="/"
                            className={`hover:text-blue-600 dark:hover:text-blue-400 ${
                                pathname === "/"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : ""
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/pricing"
                            className={`hover:text-blue-600 dark:hover:text-blue-400 ${
                                pathname === "/pricing"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : ""
                            }`}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/about"
                            className={`hover:text-blue-600 dark:hover:text-blue-400 ${
                                pathname === "/about"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : ""
                            }`}
                        >
                            About
                        </Link>
                        <Link
                            href="/faq"
                            className={`hover:text-blue-600 dark:hover:text-blue-400 ${
                                pathname === "/faq"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : ""
                            }`}
                        >
                            FAQ
                        </Link>
                        {logged && (
                            <Link
                                href="/control"
                                className={`hover:text-blue-600 dark:hover:text-blue-400 ${
                                    pathname === "/control"
                                        ? "text-blue-600 dark:text-blue-400"
                                        : ""
                                }`}
                            >
                                Control Panel
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center" suppressHydrationWarning>
                        {logged ? (
                            <div className="flex items-center">
                                <Link
                                    href="/account"
                                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
                                >
                                    <User className="h-6 w-6" />
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/auth/login"
                                    className="hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="bg-blue-700 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
