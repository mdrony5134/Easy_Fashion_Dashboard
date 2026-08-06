"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Tags, Plus, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";

type AttributeType = "Category" | "Style" | "Size";

interface AttributeItem {
  _id: string;
  name: string;
  slug?: string;
  sortOrder?: number;
  isActive: boolean;
  createdAt: string;
}

// Initial Mock Data based on provided JSON
const initialCategories: AttributeItem[] = [
  {
    _id: "6a74303980475f422297d3b6",
    name: "SWeapShirt",
    slug: "sweapshirt",
    isActive: true,
    createdAt: "2026-08-06T06:56:57.266Z",
  },
];

const initialStyles: AttributeItem[] = [
  {
    _id: "6a73ee652103385631fa2c64",
    name: "Streetwear",
    isActive: true,
    createdAt: "2026-08-06T02:16:05.963Z",
  },
];

const initialSizes: AttributeItem[] = [
  {
    _id: "6a7430ac80475f422297d3c4",
    name: "XL",
    sortOrder: 10,
    isActive: true,
    createdAt: "2026-08-06T06:58:52.838Z",
  },
  {
    _id: "6a7430a680475f422297d3c2",
    name: "L",
    sortOrder: 10,
    isActive: true,
    createdAt: "2026-08-06T06:58:46.737Z",
  },
  {
    _id: "6a74309f80475f422297d3c0",
    name: "M",
    sortOrder: 10,
    isActive: true,
    createdAt: "2026-08-06T06:58:39.137Z",
  },
  {
    _id: "6a74309880475f422297d3be",
    name: "S",
    sortOrder: 10,
    isActive: true,
    createdAt: "2026-08-06T06:58:32.235Z",
  },
];

export default function AttributesPage() {
  const [activeTab, setActiveTab] = useState<AttributeType>("Category");
  const [categories, setCategories] = useState(initialCategories);
  const [styles, setStyles] = useState(initialStyles);
  const [sizes, setSizes] = useState(initialSizes);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AttributeItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    slug: string;
    sortOrder: number;
    isActive: boolean;
  }>({
    name: "",
    slug: "",
    sortOrder: 10,
    isActive: true,
  });

  const getActiveData = () => {
    switch (activeTab) {
      case "Category":
        return categories;
      case "Style":
        return styles;
      case "Size":
        return sizes;
      default:
        return [];
    }
  };

  const handleOpenModal = (item?: AttributeItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        slug: item.slug || "",
        sortOrder: item.sortOrder || 10,
        isActive: item.isActive,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        slug: "",
        sortOrder: 10,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: AttributeItem = {
      _id: editingItem ? editingItem._id : Math.random().toString(36).substr(2, 9),
      name: formData.name,
      isActive: formData.isActive,
      createdAt: editingItem ? editingItem.createdAt : new Date().toISOString(),
    };

    if (activeTab === "Category") {
      newItem.slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-");
    } else if (activeTab === "Size") {
      newItem.sortOrder = formData.sortOrder;
    }

    if (activeTab === "Category") {
      if (editingItem) {
        setCategories(categories.map((c) => (c._id === editingItem._id ? newItem : c)));
      } else {
        setCategories([newItem, ...categories]);
      }
    } else if (activeTab === "Style") {
      if (editingItem) {
        setStyles(styles.map((s) => (s._id === editingItem._id ? newItem : s)));
      } else {
        setStyles([newItem, ...styles]);
      }
    } else if (activeTab === "Size") {
      if (editingItem) {
        setSizes(sizes.map((s) => (s._id === editingItem._id ? newItem : s)));
      } else {
        setSizes([newItem, ...sizes]);
      }
    }

    toast.success(`${activeTab} ${editingItem ? "updated" : "created"} successfully`);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete this ${activeTab.toLowerCase()}?`)) {
      if (activeTab === "Category") {
        setCategories(categories.filter((c) => c._id !== id));
      } else if (activeTab === "Style") {
        setStyles(styles.filter((s) => s._id !== id));
      } else if (activeTab === "Size") {
        setSizes(sizes.filter((s) => s._id !== id));
      }
      toast.success(`${activeTab} deleted successfully`);
    }
  };

  const tabs: AttributeType[] = ["Category", "Style", "Size"];

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Tags className="w-8 h-8 text-brand-green" />
            Product Attributes
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your categories, styles, and sizes to organize your products.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-brand-green hover:bg-green-600 text-white px-5 py-2.5 rounded-lg transition-colors font-medium whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Add {activeTab}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 border-b border-gray-200">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-t-lg font-medium text-sm transition-colors ${
                activeTab === tab
                  ? "bg-white text-brand-green border-t border-x border-gray-200 shadow-[0_-2px_4px_rgba(0,0,0,0.02)]"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab}s
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                <th className="py-4 px-6 font-medium">Name</th>
                {activeTab === "Category" && <th className="py-4 px-6 font-medium">Slug</th>}
                {activeTab === "Size" && <th className="py-4 px-6 font-medium">Sort Order</th>}
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Created Date</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {getActiveData().length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No {activeTab.toLowerCase()}s found.
                  </td>
                </tr>
              ) : (
                getActiveData().map((item) => (
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
                          onClick={() => handleOpenModal(item)}
                          className="p-2 text-gray-400 hover:text-brand-yellow hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingItem ? `Edit ${activeTab}` : `Add New ${activeTab}`}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={`Enter ${activeTab.toLowerCase()} name`}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
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
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="Auto-generated if left empty"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                  />
                </div>
              )}

              {activeTab === "Size" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.sortOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, sortOrder: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                  />
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Active Status
                  </span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="pt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-brand-green text-white rounded-lg hover:bg-green-600 font-medium transition-colors"
                >
                  {editingItem ? "Save Changes" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
