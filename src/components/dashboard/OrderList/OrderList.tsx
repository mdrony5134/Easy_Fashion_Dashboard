"use client";

import React, { useState } from "react";
import OrderHeader from "./OrderHeader";
import OrderDetailsModal from "./OrderDetailsModal";
import { OrderType, OrderStatus } from "@/types/ordersTypes";
import { initialOrders } from "./data/mockData";
import { toast } from "sonner";
import OrdersTable from "@/components/table/OrdersTable";

export default function OrderListPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order status updated to ${newStatus}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order._id.toLowerCase().includes(searchLower) ||
      order.customerName.toLowerCase().includes(searchLower) ||
      order.phone.includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6">
      <OrderHeader onSearch={handleSearch} />

      <OrdersTable
        orders={filteredOrders}
        onView={setSelectedOrder}
        onStatusChange={handleStatusChange}
      />

      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </div>
  );
}