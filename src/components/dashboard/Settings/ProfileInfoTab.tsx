"use client";

import React from "react";
import { Edit, X, Save, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProfileInfoTabProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
  };
  isEditing: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  onInputChange: (field: string, value: string) => void;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProfileInfoTab({
  formData,
  isEditing,
  isLoading,
  isUpdating,
  onInputChange,
  onEditToggle,
  onSave,
  onCancel,
}: ProfileInfoTabProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-6 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-medium text-gray-900 sm:text-xl">
            Profile Information
          </h1>
        </div>

        <div className="flex gap-3">
          {isEditing && (
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          )}
          <Button
            onClick={onEditToggle}
            variant={isEditing ? "outline" : "default"}
            className={`flex w-full items-center justify-center gap-2 sm:w-auto ${
              !isEditing ? "bg-brand-red hover:bg-red-700 text-white" : ""
            }`}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                <span onClick={onSave}>Save</span>
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Edit
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="mb-3 block text-base font-medium text-gray-900">
            Full Name
          </label>
          <Input
            value={formData.fullName}
            onChange={(e) => onInputChange("fullName", e.target.value)}
            disabled={!isEditing}
            className="h-14 w-full rounded-xl border-gray-200 px-4 text-base focus:border-brand-red focus:ring-brand-red disabled:cursor-not-allowed disabled:bg-gray-100"
            placeholder="Enter full name"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-3 block text-base font-medium text-gray-900">
            Email Address
          </label>
          <Input
            type="email"
            value={formData.email}
            disabled
            className="h-14 w-full cursor-not-allowed rounded-xl border-gray-200 bg-gray-100 px-4 text-base"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-3 block text-base font-medium text-gray-900">
            Phone Number
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => onInputChange("phone", e.target.value)}
            disabled={!isEditing}
            placeholder="Enter phone number"
            className="h-14 w-full rounded-xl border-gray-200 px-4 text-base focus:border-brand-red focus:ring-brand-red disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>
      </div>

      {isEditing && (
        <div className="mt-8">
          <Button
            onClick={onSave}
            disabled={isUpdating}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-red px-8 py-3 text-base font-medium text-white hover:bg-red-700 sm:w-auto"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      )}
    </>
  );
}