"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader2, X } from "lucide-react";

interface OrderHeaderProps {
  onSearch: (term: string) => void;
  isLoading?: boolean;
  searchTerm?: string;
}

export default function OrderHeader({ 
  onSearch, 
  isLoading = false,
  searchTerm = ""
}: OrderHeaderProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setLocalSearchTerm("");
    onSearch("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            Order Management
            {isLoading && (
              <Loader2 className="h-5 w-5 animate-spin text-brand-red" />
            )}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            View and manage customer orders and their statuses.
          </p>
        </div>
        
        <div className="relative w-full sm:w-64 lg:w-80">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order ID, customer, or phone..."
            value={localSearchTerm}
            onChange={handleSearch}
            disabled={isLoading}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green disabled:opacity-50 transition-all"
          />
          {localSearchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}