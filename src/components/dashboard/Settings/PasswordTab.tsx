// app/admin/settings/components/PasswordTab.tsx
"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Info, Lock, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordTab() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<PasswordFormData>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (data.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsChanging(true);
    try {
      // Simulate API call - will be replaced with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Password changed successfully");
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 sm:mb-8">
        <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
          Change Password
        </h2>
      </div>

      <p className="mb-6 text-sm text-gray-500">
        Ensure your account is using a long, random password to stay secure.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Current Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              {...register("oldPassword", {
                required: "Current password is required",
              })}
              placeholder="Enter your current password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showOldPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="Enter your new password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.newPassword.message}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Must be at least 8 characters long
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              placeholder="Confirm your new password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isChanging}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red px-6 py-3 font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 sm:w-auto"
          >
            {isChanging ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Changing Password...
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}