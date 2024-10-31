"use client";

import { useEffect, useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { validateEmail, validatePassword } from "../functions";
import { signup } from "../actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await signup(formData.name, formData.email, formData.password);
    if (!r.success && r.error) {
      toast.error(r.error);
    } else if (r.success) {
      toast.success("Account created successfully");
      NProgress.start();
      router.push("/account");
    }
  };

  useEffect(() => {
    if (formData.email.length > 0) {
      const validate = validateEmail(formData.email);
      if (!validate) {
        setError("Invalid email address");
      } else {
        setError("");
      }
    }
    if (formData.password.length > 0) {
      const validate = validatePassword(formData.password);
      if (!validate) {
        setError(
          "Password must be between 8-20 characters and contain at least a uppercase letter, a lowercase letter, a number and a symbol"
        );
      } else if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 text-white">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-gray-400">Join the cloud gaming revolution</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 pl-10"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

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

            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 pl-10"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div
              className={
                "text-red-400 h-16 " + `${error.length < 80 ? "" : "text-sm"}`
              }
            >
              {error}
            </div>

            {/* <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  checked={formData.terms}
                  onChange={(e) =>
                    setFormData({ ...formData, terms: e.target.checked })
                  }
                  required
                />
                <span className="ml-2 text-sm text-gray-400">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div> */}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-400 hover:text-blue-300"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
