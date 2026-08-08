"use client";

import React from "react";
import { User, Lock, ChevronRight } from "lucide-react";

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SettingsSidebar({ 
  activeTab, 
  onTabChange 
}: SettingsSidebarProps) {
  const tabs = [
    { id: "basic", label: "Profile", icon: User },
    { id: "password", label: "Change Password", icon: Lock },
  ];

  return (
    <aside className="w-full flex-shrink-0 rounded-2xl bg-white p-4 sm:p-6 lg:w-80">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-left transition-colors ${
                isActive
                  ? "bg-brand-red text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                <span className="text-sm font-medium sm:text-base lg:text-lg">
                  {tab.label}
                </span>
              </div>
              <ChevronRight className={`h-5 w-5 flex-shrink-0 ${
                isActive ? "text-white" : "text-gray-400"
              }`} />
            </button>
          );
        })}
      </div>
    </aside>
  );
}