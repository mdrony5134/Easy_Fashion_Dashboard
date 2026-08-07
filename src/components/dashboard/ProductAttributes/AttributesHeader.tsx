import React from "react";
import { Plus } from "lucide-react";
import { AttributeType } from "@/types/attributeTypes";

interface AttributesHeaderProps {
  activeTab: AttributeType;
  onAddClick: () => void;
  isLoading?: boolean;
}

export default function AttributesHeader({ 
  activeTab, 
  onAddClick, 
  isLoading = false 
}: AttributesHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Product Attributes
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your categories, styles, and sizes to organize your products.
        </p>
      </div>
      <button
        onClick={onAddClick}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 bg-brand-red text-white px-5 py-2.5 rounded-lg transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700"
      >
        <Plus className="w-5 h-5" />
        Add {activeTab}
      </button>
    </div>
    </div>
  );
}