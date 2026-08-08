"use client";

import { Search, UserPlus } from "lucide-react";
import React, { useEffect, useState } from "react";

interface UsersHeaderProps {
  onAddClick?: () => void;
  onSearch: (term: string) => void;
  isLoading?: boolean;
  totalUsers?: number;
}

export default function UsersHeader({
  onAddClick,
  onSearch,
  isLoading = false,
  // totalUsers = 0,
}: UsersHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4 w-full lg:w-auto">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
              User Management
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Manage your administrators, managers, and customers
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:flex-initial min-w-[200px] lg:min-w-[280px]">
            <div
              className={`relative transition-all duration-200 ${
                isFocused ? "ring-2 ring-brand-red ring-offset-1" : ""
              } rounded-lg`}
            >
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                  isFocused ? "text-brand-red" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isLoading}
                className="w-full sm:w-64 lg:w-72 pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red text-sm transition-all bg-gray-50 hover:bg-white disabled:opacity-50"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    onSearch("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="text-xs font-medium">✕</span>
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {onAddClick && (
              <button
                onClick={onAddClick}
                disabled={isLoading}
                className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 font-medium whitespace-nowrap shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                <UserPlus className="w-5 h-5" />
                <span className="hidden sm:inline">Create User</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
