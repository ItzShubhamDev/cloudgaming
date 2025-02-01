"use client";

import { useEffect, useState } from "react";
import { UserIcon, CreditCard, Bell, Shield, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import { User as IUser } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import Billing from "@/components/tabs/billing";
import Security from "@/components/tabs/security";
import User from "@/components/tabs/user";

type History = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    amount: number;
    paid: boolean;
};

export default function Account() {
    const [activeTab, setActiveTab] = useState("profile");
    const [user, setUser] = useState<IUser | null>(null);
    const [history, setHistory] = useState<History[] | null>(null);
    const [current, setCurrent] = useState<History | null>(null);
    const router = useRouter();
    const supabase = createClient();

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            nProgress.start();
            router.push("/auth/login");
        }
    }

    useEffect(() => {
        fetch("/api/orders").then(async (r) => {
            const data = await r.json();
            const history = data.data as History[];
            setHistory(history);
        });
    }, []);

    useEffect(() => {
        fetch("/api/plan").then(async (r) => {
            const data = await r.json();
            const current = data.data as History | null;
            setCurrent(current);
        });
    }, []);

    useEffect(() => {
        supabase.auth.getUser().then((r) => {
            if (r.data.user) {
                setUser(r.data.user);
            } else {
                nProgress.start();
                router.push("/auth/login");
            }
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 text-black dark:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl p-6 h-fit">
                        <div className="flex items-center space-x-4 mb-8">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
                                alt="Profile"
                                className="w-16 h-16 rounded-full"
                            />
                            <div>
                                <h2 className="font-semibold">
                                    {user?.user_metadata.name || "User"}
                                </h2>
                                <p className="text-sm text-gray-400">None</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {[
                                {
                                    id: "profile",
                                    label: "Profile",
                                    icon: UserIcon,
                                },
                                {
                                    id: "security",
                                    label: "Security",
                                    icon: Shield,
                                },
                                {
                                    id: "billing",
                                    label: "Billing",
                                    icon: CreditCard,
                                },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                                        activeTab === item.id
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-gray-300 dark:hover:bg-gray-700"
                                    }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </button>
                            ))}
                            <button
                                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-red-400 hover:bg-gray-700"
                                onClick={signOut}
                            >
                                <LogOut className="h-5 w-5" />
                                <span>Sign Out</span>
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        {activeTab === "profile" && <User user={user!} />}
                        {activeTab === "security" && <Security />}
                        {activeTab === "billing" && (
                            <Billing current={current!} history={history!} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
