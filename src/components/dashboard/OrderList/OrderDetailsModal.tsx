"use client";

import React from "react";
import { createPortal } from "react-dom";
import { 
  X, FileText, MapPin, Phone, User, Package, Calendar 
} from "lucide-react";
import { OrderType, STATUS_COLORS } from "@/types/ordersTypes";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderType | null;
}

export default function OrderDetailsModal({
  isOpen,
  onClose,
  order,
}: OrderDetailsModalProps) {
  if (!isOpen || !order || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        
        <div className="flex flex-shrink-0 items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Order Details
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-mono">
              OrderId: #{order._id.toUpperCase()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-full shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Details */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2">
                <User className="w-4 h-4 text-brand-green" /> Customer Info
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-700 flex items-start gap-3">
                  <User className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <span className="font-medium">{order.customerName}</span>
                </p>
                <p className="text-sm text-gray-700 flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  {order.phone}
                </p>
                <p className="text-sm text-gray-700 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  {order.shippingAddress}
                </p>
              </div>
            </div>

          
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2">
                <FileText className="w-4 h-4 text-brand-green" /> Order Summary
              </h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-700 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" /> Date:
                  </span>
                  <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-700 flex items-center justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md border ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-700 flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="font-medium text-gray-900">Grand Total:</span>
                  <span className="font-bold text-brand-green text-lg">৳ {order.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

         
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-brand-green" /> Order Items ({order.items.length})
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
                  {order.items.map((item, idx) => (
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
  );
}