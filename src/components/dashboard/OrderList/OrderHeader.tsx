"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

interface OrderHeaderProps {
  onSearch: (term: string) => void;
}

export default function OrderHeader({ onSearch }: OrderHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Order Management
        </h1>
        <p className="text-gray-500 mt-1">
          View and manage customer orders and their statuses.
        </p>
      </div>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green w-full sm:w-64"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}