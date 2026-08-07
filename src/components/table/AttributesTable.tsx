// components/table/AttributesTable.tsx
import React from "react";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { AttributeItem, AttributeType } from "@/types/attributeTypes";

interface AttributesTableProps {
  data: AttributeItem[];
  activeTab: AttributeType;
  onEdit: (item: AttributeItem) => void;
  onDelete: (id: string, name: string) => void;  // Updated to accept name
  isLoading?: boolean;
}

export default function AttributesTable({ 
  data, 
  activeTab, 
  onEdit, 
  onDelete,
  isLoading = false 
}: AttributesTableProps) {
  const renderTableHeaders = () => (
    <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
      <th className="py-4 px-6 font-medium">Name</th>
      {activeTab === "Category" && (
        <th className="py-4 px-6 font-medium">Slug</th>
      )}
      {activeTab === "Size" && (
        <th className="py-4 px-6 font-medium">Sort Order</th>
      )}
      <th className="py-4 px-6 font-medium">Status</th>
      <th className="py-4 px-6 font-medium">Created Date</th>
      <th className="py-4 px-6 font-medium text-right">Actions</th>
    </tr>
  );

  const renderTableRow = (item: AttributeItem) => (
    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6 font-medium text-gray-900">{item.name}</td>

      {activeTab === "Category" && (
        <td className="py-4 px-6 text-sm text-gray-600">{item.slug}</td>
      )}

      {activeTab === "Size" && (
        <td className="py-4 px-6 text-sm text-gray-600">{item.sortOrder}</td>
      )}

      <td className="py-4 px-6">
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
            item.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {item.isActive ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="py-4 px-6 text-sm text-gray-600">
        {new Date(item.createdAt).toLocaleDateString()}
      </td>

      <td className="py-4 px-6">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(item)}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-brand-yellow hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item._id, item.name)}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  if (isLoading && data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>{renderTableHeaders()}</thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No {activeTab.toLowerCase()}s found.
                </td>
              </tr>
            ) : (
              data.map(renderTableRow)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}