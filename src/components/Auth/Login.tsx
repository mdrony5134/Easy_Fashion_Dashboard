"use client";

import logo from "@/assets/logo.webp";
import { useLoginMutation } from "@/redux/api/authApi";
import Cookies from "js-cookie";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/ReduxFunction";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginFn] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginFn({ email, password }).unwrap();
      if (response) {
        toast.success("Login successful");
        
        const userData = response.data?.user;
        if (userData) {
          dispatch(setUser({
            role: userData.role?.name,
            email: userData.email,
          }));
        }

        Cookies.set("token", response?.data?.accessToken);
        router.push("/dashboard");
      }
    } catch {
      toast.error("login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-[440px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
        <div className="h-1.5 w-full bg-[#B70A1C] absolute top-0 left-0"></div>

        <div className="p-8 sm:p-10 pt-12">
          <div className="flex justify-center mb-6">
            <Image
              src={logo}
              alt="Easy Fashion Logo"
              width={180}
              height={80}
              className="object-contain"
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">
              Please sign in to your account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0F172A]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="admin@adminguard.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#B70A1C] focus:ring-1 focus:ring-[#B70A1C] text-gray-900 placeholder:text-gray-400 transition-colors bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-[#0F172A]">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#B70A1C] focus:ring-1 focus:ring-[#B70A1C] text-gray-900 placeholder:text-gray-400 transition-colors bg-white font-mono"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#B70A1C] text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
