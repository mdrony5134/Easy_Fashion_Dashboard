"use client";

import React, { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import OrderHeader from "./OrderHeader";
import OrderDetailsModal from "./OrderDetailsModal";
import OrdersTable from "@/components/table/OrdersTable";
import Pagination from "@/components/ui/Pagination";
import { OrderType, OrderStatus } from "@/types/ordersTypes";
import { 
  useGetAllOrdersListQuery, 
  useUpdateOrderStatusMutation 
} from "@/redux/api/orderApi";

export default function OrderList() {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { data: ordersData, refetch, isLoading } = useGetAllOrdersListQuery({
    page: currentPage,
    limit: itemsPerPage, 
  });

  const [updateOrderStatusFn, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

  const allOrders = ordersData?.data || [];
  const meta = ordersData?.meta || { total: 0, totalPages: 1 };

  // Frontend search filter
  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) {
      return allOrders;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    return allOrders.filter((order: OrderType) => {
      const orderId = order._id.toLowerCase();
      const customerName = order.customerName.toLowerCase();
      const phone = order.phone || "";
      
      return (
        orderId.includes(searchLower) ||
        customerName.includes(searchLower) ||
        phone.includes(searchLower)
      );
    });
  }, [allOrders, searchTerm]);

  // Pagination for filtered data
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const totalFilteredItems = filteredOrders.length;
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const order = allOrders.find((o: OrderType) => o._id === orderId);
    if (!order) return;

    const result = await Swal.fire({
      title: 'Update Order Status',
      html: `You are about to update the order status to: <strong>${newStatus}</strong>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update status',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await updateOrderStatusFn({ 
          id: orderId, 
          data: { status: newStatus } 
        }).unwrap();
        toast.success(`Order status updated to ${newStatus}`);
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update order status");
      }
    }
  };

  const handleViewOrder = (order: OrderType) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="space-y-6">
      <OrderHeader 
        onSearch={handleSearch} 
        isLoading={isLoading}
        searchTerm={searchTerm}
      />

      <OrdersTable
        orders={paginatedOrders}
        onView={handleViewOrder}
        onStatusChange={handleStatusChange}
        isLoading={isLoading || isUpdating}
        totalItems={totalFilteredItems}
      />

      {totalFilteredItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalFilteredItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}

      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={handleCloseModal}
        order={selectedOrder}
      />
    </div>
  );
}