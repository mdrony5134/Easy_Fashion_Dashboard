"use client";

import React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Package } from "lucide-react";
import { Product } from "@/types/productTypes";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function ProductDetailsModal({
  isOpen,
  onClose,
  product,
}: ProductDetailsModalProps) {
  if (!isOpen || !product || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex flex-shrink-0 items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Product Details
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-full shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/3 aspect-square relative rounded-xl border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
              {product.images && product.images.length > 0 ? (
                <Image 
                  src={product.images[0]} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-300" />
                </div>
              )}
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 font-mono mt-1">
                  Slug: {product.slug || "N/A"}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-brand-green">
                  ৳{(product.price / 100).toFixed(2)}
                </span>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                  product.isActive 
                    ? "bg-green-100 text-green-700" 
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Category</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {product.category?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Style</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {product.style?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Available Sizes</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.sizes && product.sizes.length > 0 ? (
                      product.sizes.map((size) => (
                        <span 
                          key={size._id} 
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                        >
                          {size.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">No sizes available</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Stock Quantity</p>
                  <p className="font-medium text-gray-900 mt-1">{product.stock || 0} units</p>
                </div>
              </div>
            </div>
          </div>

           {product.images && product.images.length > 1 && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Product Images</p>
              <div className="flex flex-wrap gap-3">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className="w-20 h-20 relative rounded-lg border border-gray-200 overflow-hidden bg-gray-50"
                  >
                    <Image 
                      src={image} 
                      alt={`${product.name} - Image ${index + 1}`} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Description</p>
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
              {product.description || "No description provided."}
            </p>
          </div>

         
        </div>
      </div>
    </div>,
    document.body
  );
}