"use client";

import { useEffect, useState } from "react";
import { UserIcon, CreditCard, Bell, Shield, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

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
  const [user, setUser] = useState<User | null>(null);
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
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-gray-800 rounded-2xl p-6 h-fit">
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
                { id: "profile", label: "Profile", icon: UserIcon },
                { id: "security", label: "Security", icon: Shield },
                { id: "billing", label: "Billing", icon: CreditCard },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                    activeTab === item.id ? "bg-blue-600" : "hover:bg-gray-700"
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
            {activeTab === "profile" && (
              <div className="bg-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.user_metadata.name}
                        className="w-full bg-gray-700 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full bg-gray-700 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        ID
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.id}
                        className="w-full bg-gray-700 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>
                  {/* <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
                    >
                      Save Changes
                    </button>
                  </div> */}
                </form>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Change Password
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-gray-700 rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-gray-700 rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-gray-700 rounded-lg px-4 py-2"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium">
                          Protect your account with 2FA
                        </p>
                        <p className="text-sm text-gray-400">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="bg-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Billing Settings</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
                    <div className="bg-gray-700 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="font-semibold">
                            {current?.name[0].toUpperCase()! +
                              current?.name.substring(0, current.name.length)}
                          </p>
                          <p className="text-sm text-gray-400">₹{current?.amount}/month</p>
                        </div>
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                        </span>
                      </div>
                      <div className="flex">
                        <button className="border border-gray-600 hover:bg-gray-600 px-4 py-2 rounded-lg">
                          Cancel Plan
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Billing History
                    </h3>
                    <div className="bg-gray-700 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-4">Date</th>
                            <th className="text-left p-4">Description</th>
                            <th className="text-left p-4">Amount</th>
                            <th className="text-left p-4">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history?.map((h) => (
                            <tr key={h.id} className="border-b border-gray-600">
                              <td className="p-4">
                                {new Date(h.created_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </td>
                              <td className="p-4">
                                {h.name[0].toUpperCase() +
                                  h.name.substring(1, h.name.length)}
                              </td>
                              <td className="p-4">₹{h.amount}</td>
                              <td className="p-4">
                                <span
                                  className={
                                    "px-2 py-1 rounded-full text-sm " +
                                    `${
                                      h.paid
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                    }`
                                  }
                                >
                                  {h.paid ? "Paid" : "Unpaid"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
