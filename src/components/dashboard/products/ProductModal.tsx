"use client";

import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import ProductForm from "./ProductForm";
import { Product } from "@/types/productTypes";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  mode: "create" | "edit";
  title: string;
  initialData?: Product;
  isLoading?: boolean;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  mode,
  title,
  initialData,
  isLoading = false,
}: ProductModalProps) {
  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 z-10 transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-8">
          <ProductForm 
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
            mode={mode}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}