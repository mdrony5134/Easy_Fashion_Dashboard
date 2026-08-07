"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import ProductForm from "@/components/dashboard/products/ProductForm";
import { PackageSearch, Plus, Eye, Edit, Trash2, X } from "lucide-react";
import Image from "next/image";

// Mock data provided by user
const mockProducts = [
  {
    _id: "6a73ff0ff4361d9773a8d812",
    name: "Field Olive Hoodie",
    slug: "field-olive-hoodie",
    category: {
      _id: "6a73ede52103385631fa2c5d",
      name: "Denim",
      slug: "denim",
    },
    style: {
      _id: "6a73ee652103385631fa2c64",
      name: "Streetwear",
    },
    sizes: [
      {
        _id: "6a73ee292103385631fa2c60",
        name: "XL",
        sortOrder: 10,
      },
    ],
    description: "A very comfortable hoodie.",
    price: 2650,
    images: [
      "https://res.cloudinary.com/dwzmf5m7s/image/upload/v1785986829/products/hfbzwoqisdmsbgscvyrh.webp",
    ],
    stock: 50,
    isActive: true,
    createdAt: "2026-08-06T03:27:11.244Z",
    updatedAt: "2026-08-06T03:27:11.244Z",
  },
];

type ProductType = typeof mockProducts[0];

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            Products Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your inventory, sizes, and styles seamlessly.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-red hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Product List Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                <th className="py-4 px-6 font-medium">Product</th>
                <th className="py-4 px-6 font-medium">Category</th>
                <th className="py-4 px-6 font-medium">Style</th>
                <th className="py-4 px-6 font-medium">Price</th>
                <th className="py-4 px-6 font-medium">Stock</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative border border-gray-200">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">Sizes: {product.sizes.map(s => s.name).join(", ")}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{product.category.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{product.style.name}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">৳{(product.price / 100).toFixed(2)}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{product.stock}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingProduct(product)}
                        className="p-2 text-gray-400 hover:text-brand-yellow hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-2">
              <ProductForm />
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Product Details Modal */}
      {selectedProduct && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex flex-shrink-0 items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Product Details
              </h2>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-full shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-1/3 aspect-square relative rounded-xl border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
                  <Image 
                    src={selectedProduct.images[0]} 
                    alt={selectedProduct.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h3>
                    <p className="text-sm text-gray-500 font-mono mt-1">Slug: {selectedProduct.slug}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-brand-green">৳{(selectedProduct.price / 100).toFixed(2)}</span>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      selectedProduct.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {selectedProduct.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Category</p>
                      <p className="font-medium text-gray-900 mt-1">{selectedProduct.category.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Style</p>
                      <p className="font-medium text-gray-900 mt-1">{selectedProduct.style.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Available Sizes</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedProduct.sizes.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Stock Quantity</p>
                      <p className="font-medium text-gray-900 mt-1">{selectedProduct.stock} units</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Description</p>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {selectedProduct.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
      {/* Edit Product Modal */}
      {editingProduct && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setEditingProduct(null)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setEditingProduct(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-2">
              <ProductForm initialData={editingProduct} />
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
