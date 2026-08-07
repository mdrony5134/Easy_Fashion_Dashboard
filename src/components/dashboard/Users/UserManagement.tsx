"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { UserType } from "@/types/usersTypes";
import UsersTable from "@/components/table/UsersTable";

import {
  useCreateUserMutation,
  useGetUserListQuery,
  useUpdateUserStatusMutation,
} from "@/redux/api/usersApi";
import UsersHeader from "./UsersHeader";
import Pagination from "@/components/ui/Pagination";
import CreateUserModal from "./CreateUserModal";

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const {
    data: usersData,
    refetch,
    isLoading,
  } = useGetUserListQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery,
  });

  const [createUserFn, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUserStatusFn] =
    useUpdateUserStatusMutation();

  const users = usersData?.data || [];
  const meta = usersData?.meta || { total: 0, totalPages: 1 };

  const handleCreateUser = async (userData: any) => {
    try {
      const response = await createUserFn(userData).unwrap();
      toast.success("User created successfully!");
      setIsCreateModalOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create user");
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const user = users.find((u: UserType) => u.id === id);
    if (!user) return;

    const newStatus = !currentStatus;
    const action = newStatus ? "true" : "false";

    const result = await Swal.fire({
      title: `Are you sure?`,
      html: `You are about to <strong>${action}</strong> the user: <strong>"${user.fullName}"</strong>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus ? "#22c55e" : "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${action} user`,
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await updateUserStatusFn({
          id,
          data: { isActive: newStatus },
        }).unwrap();
        toast.success(`User ${action}d successfully!`);
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || `Failed to ${action} user`);
      }
    }
  };



  const handleSearch = (term: string) => {
    setSearchQuery(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, searchQuery, refetch]);

  return (
    <div className="space-y-6 relative">
      <UsersHeader
        onAddClick={() => setIsCreateModalOpen(true)}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      <UsersTable
        users={users}
        onToggleStatus={handleToggleStatus}
        isLoading={isLoading}
      />

      {meta.total > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={meta.total}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateUser}
        isLoading={isCreating}
      />
    </div>
  );
}
