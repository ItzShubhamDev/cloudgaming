"use client";

import { useEffect, useState } from "react";
import { UserIcon, CreditCard, Bell, Shield, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import { User } from "@supabase/supabase-js";

export default function Account() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  async function getUser() {
    const res = await fetch("/api/user");
    const data = await res.json();
    if (!data.success) {
      nProgress.start();
      router.push("/auth/login");
    }
    return data.data.user;
  }

  async function signOut() {
    const res = await fetch("/api/user/signout");
    const data = await res.json();
    if (data.success) {
      nProgress.start();
      router.push("/auth/login");
    }
  }

  useEffect(() => {
    getUser().then((data) => setUser(data));
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
              <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-red-400 hover:bg-gray-700" onClick={signOut}>
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
                          <p className="font-semibold">Pro Plan</p>
                          <p className="text-sm text-gray-400">$49/month</p>
                        </div>
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          Active
                        </span>
                      </div>
                      <div className="flex space-x-4">
                        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                          Upgrade Plan
                        </button>
                        <button className="border border-gray-600 hover:bg-gray-600 px-4 py-2 rounded-lg">
                          Cancel Plan
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Payment Method
                    </h3>
                    <div className="bg-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6" />
                          <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-gray-400">
                              Expires 12/24
                            </p>
                          </div>
                        </div>
                        <button className="text-blue-400 hover:text-blue-300">
                          Edit
                        </button>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                        Add Payment Method
                      </button>
                    </div>
                  </div> */}

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
                          <tr className="border-b border-gray-600">
                            <td className="p-4">Mar 1, 2024</td>
                            <td className="p-4">Pro Plan - Monthly</td>
                            <td className="p-4">$49.00</td>
                            <td className="p-4">
                              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                                Paid
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4">Feb 1, 2024</td>
                            <td className="p-4">Pro Plan - Monthly</td>
                            <td className="p-4">$49.00</td>
                            <td className="p-4">
                              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                                Paid
                              </span>
                            </td>
                          </tr>
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
