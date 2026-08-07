import React from "react";
import { createPortal } from "react-dom";
import { X, Loader2 } from "lucide-react";
import { AttributeItem, AttributeType, FormData } from "@/types/attributeTypes";

interface AttributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: FormData;
  onFormChange: (field: string, value: any) => void;
  editingItem: AttributeItem | null;
  activeTab: AttributeType;
  isLoading?: boolean;
}

export default function AttributeModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onFormChange,
  editingItem,
  activeTab,
  isLoading = false,
}: AttributeModalProps) {
  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {editingItem ? `Edit ${activeTab}` : `Add New ${activeTab}`}
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => onFormChange("name", e.target.value)}
              placeholder={`Enter ${activeTab.toLowerCase()} name`}
              disabled={isLoading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {activeTab === "Category" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => onFormChange("slug", e.target.value)}
                placeholder="Auto-generated if left empty"
                disabled={isLoading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          )}

          {activeTab === "Size" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Sort Order <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                value={formData.sortOrder}
                onChange={(e) =>
                  onFormChange("sortOrder", parseInt(e.target.value))
                }
                disabled={isLoading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          )}

          {/* <div className="flex items-center gap-3 pt-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.isActive}
                onChange={(e) => onFormChange("isActive", e.target.checked)}
                disabled={isLoading}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green disabled:opacity-50" />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Active Status
              </span>
            </label>
          </div> */}

          <div className="pt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-brand-green text-white rounded-lg hover:bg-green-600 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingItem ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
