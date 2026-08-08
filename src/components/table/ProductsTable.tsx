import React from "react";
import Image from "next/image";
import { Eye, Edit, Trash2, Loader2, Package } from "lucide-react";
import { Product } from "@/types/productTypes";

interface ProductsTableProps {
  products: Product[];
  onView: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string, name: string) => void;
  isLoading?: boolean;
  isDeleting?: boolean;
}

export default function ProductsTable({
  products,
  onView,
  onEdit,
  onDelete,
  isLoading = false,
  isDeleting = false,
}: ProductsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
        </div>
      </div>
    );
  }

  return (
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
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                      <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        No Products Found
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Get started by creating your first product.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative border border-gray-200 flex-shrink-0">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No image
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Sizes:{" "}
                          {product.sizes?.map((s) => s.name).join(", ") ||
                            "N/A"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {product.category?.name || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {product.style?.name || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    ৳{(product.price / 100).toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {product.stock}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView(product)}
                        disabled={isDeleting}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {onEdit && (
                        <button
                          onClick={() => onEdit(product)}
                          disabled={isDeleting}
                          className="p-2 text-gray-400 hover:text-brand-yellow hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(product._id, product.name)}
                          disabled={isDeleting}
                          className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
