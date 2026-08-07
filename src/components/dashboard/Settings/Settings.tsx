"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/authApi";
import SettingsSidebar from "./SettingsSidebar";
import PasswordTab from "./PasswordTab";
import ProfileInfoTab from "./ProfileInfoTab";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);

  const { data: profileData, refetch, isLoading } = useMyProfileQuery({});
  const [updateProfileFn, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();

  const user = profileData?.data;
  const fullName = user?.fullName || "";
  const [firstName, lastName] = fullName.split(" ");

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditing && user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
      };

      await updateProfileFn(payload).unwrap();
      toast.success("Profile updated successfully");
      setIsEditing(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <main className="min-w-0 flex-1 rounded-2xl bg-white p-4 sm:p-6 lg:p-8">
            {activeTab === "basic" ? (
              <ProfileInfoTab
                formData={formData}
                isEditing={isEditing}
                isLoading={isLoading}
                isUpdating={isUpdating}
                onInputChange={handleInputChange}
                onEditToggle={handleEditToggle}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <PasswordTab />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
