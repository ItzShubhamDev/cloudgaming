"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { login } from "../actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import { validateEmail } from "../functions";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await login(formData.email, formData.password);
    if (!r.success && r.error) {
      toast.error(r.error);
    } else if (r.success) {
      toast.success("Logged in successfully");
      NProgress.start();
      router.push("/");
    }
  };

  useEffect(() => {
    if (formData.email.length > 0) {
      if (validateEmail(formData.email)) {
        setError("");
      } else {
        setError("Invalid email address");
      }
    }
    if (formData.password.length > 0 && formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 text-white">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>

            <div className="text-red-400 h-6 w-full">{error}</div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-400 hover:text-blue-300"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
