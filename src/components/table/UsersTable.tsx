"use client";

import React from "react";
import { Users, Loader2 } from "lucide-react";
import { UserType } from "@/types/usersTypes";

interface UsersTableProps {
  users: UserType[];
  onToggleStatus?: (id: string, currentStatus: boolean) => void;
  isLoading?: boolean;
}

export default function UsersTable({
  users,
  onToggleStatus,
  isLoading = false,
}: UsersTableProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "ADMIN":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "MANAGER":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
              <th className="py-4 px-6 font-medium">Name</th>
              <th className="py-4 px-6 font-medium">Email</th>
              <th className="py-4 px-6 font-medium">Phone</th>
              <th className="py-4 px-6 font-medium">Role</th>
              <th className="py-4 px-6 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        No Users Found
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Start by creating your first user.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900">{user.fullName}</p>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {user.phone || "N/A"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getRoleColor(user.role.name)}`}
                    >
                      {user.role.name}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => onToggleStatus && onToggleStatus(user.id, user.isActive)}
                      disabled={!onToggleStatus}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 ${
                        user.isActive ? "bg-green-500" : "bg-gray-300"
                      } ${!onToggleStatus ? "cursor-default opacity-80" : "cursor-pointer hover:opacity-90"}`}
                      title={
                        !onToggleStatus 
                          ? (user.isActive ? "Active" : "Inactive")
                          : (user.isActive ? "Click to deactivate" : "Click to activate")
                      }
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          user.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
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
