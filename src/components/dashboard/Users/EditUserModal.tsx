"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Loader2 } from "lucide-react";
import { UserType, ROLE_OPTIONS } from "@/types/usersTypes";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, updates: Partial<UserType>) => void;
  user: UserType | null;
  isLoading?: boolean;
}

export default function EditUserModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  user,
  isLoading = false
}: EditUserModalProps) {
  const [formData, setFormData] = useState({
    role: "MANAGER",
    isActive: true
  });

  useEffect(() => {
    if (user) {
      setFormData({
        role: user.role.name,
        isActive: user.isActive
      });
    }
  }, [user]);

  if (!isOpen || !user || typeof document === "undefined") return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user.id, {
      role: { name: formData.role as any },
      isActive: formData.isActive
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Edit User <span className="text-sm font-normal text-gray-500">({user.fullName})</span>
          </h2>
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <select 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              disabled={isLoading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red bg-white disabled:opacity-50"
            >
              {ROLE_OPTIONS.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select 
              value={formData.isActive ? "active" : "inactive"}
              onChange={(e) => setFormData({...formData, isActive: e.target.value === "active"})}
              disabled={isLoading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red bg-white disabled:opacity-50"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-brand-yellow hover:bg-yellow-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 min-w-[120px] justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update User"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}