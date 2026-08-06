"use client";

import logo from "@/assets/logo.webp";
import Cookies from "js-cookie";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

type Role = "Super Admin" | "Admin" | "Manager";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeRole, setActiveRole] = useState<Role>("Super Admin");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const roles: Role[] = ["Super Admin", "Admin", "Manager"];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock API Call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`Login successful as ${activeRole}`);
      // Dummy JWT token with selected role
      const dummyToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoi${activeRole.replace(" ", "_").toUpperCase()}IiwiZXhwIjoxOTk5OTk5OTk5fQ.signature`;
      Cookies.set("token", dummyToken);
      router.push("/admin/dashboard");
    } catch {
      toast.error("login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-[440px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
        {/* Top Red Border */}
        <div className="h-1.5 w-full bg-[#B70A1C] absolute top-0 left-0"></div>

        <div className="p-8 sm:p-10 pt-12">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src={logo}
              alt="Easy Fashion Logo"
              width={180}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Headings */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">
              Please sign in to your account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0F172A]">
                Select Role
              </label>
              <div className="flex p-1 bg-[#E8F0FE] rounded-lg">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setActiveRole(role)}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeRole === role
                        ? "bg-white text-[#B70A1C] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0F172A]">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="admin@adminguard.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#B70A1C] focus:ring-1 focus:ring-[#B70A1C] text-gray-900 placeholder:text-gray-400 transition-colors bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-[#0F172A]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-bold text-[#B70A1C] hover:text-red-700 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#B70A1C] focus:ring-1 focus:ring-[#B70A1C] text-gray-900 placeholder:text-gray-400 transition-colors bg-white font-mono"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#B70A1C] text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
