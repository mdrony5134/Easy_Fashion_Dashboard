import React from "react";
import { Plus, Search } from "lucide-react";

interface ProductsHeaderProps {
  onAddClick: () => void;
  onSearch?: (term: string) => void;
  isLoading?: boolean;
}

export default function ProductsHeader({ 
  onAddClick, 
  onSearch,
  isLoading = false 
}: ProductsHeaderProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Products Management
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your inventory, sizes, and styles seamlessly.
        </p>
      </div>
      <div className="flex items-center gap-3">
        {onSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent w-48 sm:w-56"
            />
          </div>
        )}
        <button
          onClick={onAddClick}
          disabled={isLoading}
          className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>
    </div>
  );
}