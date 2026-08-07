"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { FileText, Eye, Search, X, MapPin, Phone, User, Package, Calendar } from "lucide-react";
import { toast } from "sonner";

// The status enum
type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  PROCESSING: "bg-indigo-100 text-indigo-800 border-indigo-200",
  SHIPPED: "bg-purple-100 text-purple-800 border-purple-200",
  DELIVERED: "bg-brand-green/20 text-green-800 border-brand-green/30",
  CANCELLED: "bg-brand-red/20 text-red-800 border-brand-red/30",
};

// Mock Data
const initialOrders = [
  {
    _id: "6a74360680475f422297d408",
    user: null,
    customerName: "Md Rony",
    phone: "+8801700000000",
    shippingAddress: "Dhaka, Bangladesh",
    items: [
      {
        product: "6a7435d180475f422297d3f8",
        name: "Field Olive Hoodie",
        category: "SWeapShirt",
        style: "Streetwear",
        sizes: ["L"],
        quantity: 3,
        unitPrice: 2650,
      },
    ],
    subtotal: 7950,
    grandTotal: 7950,
    status: "PENDING" as OrderStatus,
    createdAt: "2026-08-06T07:21:42.761Z",
  },
];

type OrderType = typeof initialOrders[0];

export default function OrderListPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            Order Management
          </h1>
          <p className="text-gray-500 mt-1">
            View and manage customer orders and their statuses.
          </p>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green w-full sm:w-64"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                <th className="py-4 px-6 font-medium">Order ID</th>
                <th className="py-4 px-6 font-medium">Date</th>
                <th className="py-4 px-6 font-medium">Customer</th>
                <th className="py-4 px-6 font-medium">Total</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-medium text-gray-900 font-mono text-sm">
                        #{order._id.substring(order._id.length - 8).toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.phone}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">৳ {order.grandTotal.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{order.items.length} item(s)</p>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value as OrderStatus)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-green ${STATUS_COLORS[order.status]}`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
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

      {/* Order Details Modal */}
      {selectedOrder && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}
          ></div>
          
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex flex-shrink-0 items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  Order Details
                </h2>
                <p className="text-sm text-gray-500 mt-1 font-mono">
                  #{selectedOrder._id.toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-full shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              
              {/* Top Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Details */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2">
                    <User className="w-4 h-4 text-brand-green" /> Customer Info
                  </h3>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700 flex items-start gap-3">
                      <User className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <span className="font-medium">{selectedOrder.customerName}</span>
                    </p>
                    <p className="text-sm text-gray-700 flex items-start gap-3">
                      <Phone className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      {selectedOrder.phone}
                    </p>
                    <p className="text-sm text-gray-700 flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      {selectedOrder.shippingAddress}
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2">
                    <FileText className="w-4 h-4 text-brand-green" /> Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-700 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" /> Date:
                      </span>
                      <span className="font-medium">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-700 flex items-center justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md border ${STATUS_COLORS[selectedOrder.status]}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="font-medium text-gray-900">Grand Total:</span>
                      <span className="font-bold text-brand-green text-lg">৳ {selectedOrder.grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-brand-green" /> Order Items ({selectedOrder.items.length})
                </h3>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                      <tr>
                        <th className="py-3 px-4 font-medium">Product</th>
                        <th className="py-3 px-4 font-medium">Details</th>
                        <th className="py-3 px-4 font-medium text-center">Qty</th>
                        <th className="py-3 px-4 font-medium text-right">Price</th>
                        <th className="py-3 px-4 font-medium text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50">
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="py-3 px-4 text-gray-500 text-xs space-y-1">
                            <p><span className="font-medium">Cat:</span> {item.category}</p>
                            <p><span className="font-medium">Style:</span> {item.style}</p>
                            <p><span className="font-medium">Size:</span> {item.sizes.join(", ")}</p>
                          </td>
                          <td className="py-3 px-4 text-center font-medium">
                            x{item.quantity}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            ৳ {item.unitPrice.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-gray-900">
                            ৳ {(item.quantity * item.unitPrice).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
