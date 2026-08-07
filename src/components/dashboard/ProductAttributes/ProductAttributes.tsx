"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { AttributeType, AttributeItem } from "@/types/attributeTypes";
import AttributesHeader from "./AttributesHeader";
import AttributesTabs from "./AttributesTabs";
import AttributesTable from "@/components/table/AttributesTable";
import AttributeModal from "./AttributeModal";
import {
  useCreateCategoriesMutation,
  useCreateSizesMutation,
  useCreateStylesMutation,
  useDeleteCategoryMutation,
  useDeleteSizeMutation,
  useDeleteStyleMutation,
  useGetAllCategoriesQuery,
  useGetAllSizesQuery,
  useGetAllStylesQuery,
  useUpdateCategoryMutation,
  useUpdateSizeMutation,
  useUpdateStyleMutation,
} from "@/redux/api/productAttributeApi";

export default function ProductAttributes() {
  const [activeTab, setActiveTab] = useState<AttributeType>("Category");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AttributeItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sortOrder: 10,
    isActive: true,
  });

  // Category API
  const { data: categoriesData, refetch: refetchCategories } =
    useGetAllCategoriesQuery({});
  const [createCategoryFn, { isLoading: isCreatingCategory }] =
    useCreateCategoriesMutation();
  const [updateCategoryFn, { isLoading: isUpdatingCategory }] =
    useUpdateCategoryMutation();
  const [deleteCategoryFn, { isLoading: isDeletingCategory }] =
    useDeleteCategoryMutation();

  // Style API
  const { data: stylesData, refetch: refetchStyles } = useGetAllStylesQuery({});
  const [createStyleFn, { isLoading: isCreatingStyle }] =
    useCreateStylesMutation();
  const [updateStyleFn, { isLoading: isUpdatingStyle }] =
    useUpdateStyleMutation();
  const [deleteStyleFn, { isLoading: isDeletingStyle }] =
    useDeleteStyleMutation();

  // Size API
  const { data: sizesData, refetch: refetchSizes } = useGetAllSizesQuery({});
  const [createSizeFn, { isLoading: isCreatingSize }] =
    useCreateSizesMutation();
  const [updateSizeFn, { isLoading: isUpdatingSize }] = useUpdateSizeMutation();
  const [deleteSizeFn, { isLoading: isDeletingSize }] = useDeleteSizeMutation();

  // active data
  const getActiveData = (): AttributeItem[] => {
    switch (activeTab) {
      case "Category":
        return categoriesData?.data || [];
      case "Style":
        return stylesData?.data || [];
      case "Size":
        return sizesData?.data || [];
      default:
        return [];
    }
  };

  // loading states
  const getIsLoading = () => {
    switch (activeTab) {
      case "Category":
        return isCreatingCategory || isUpdatingCategory || isDeletingCategory;
      case "Style":
        return isCreatingStyle || isUpdatingStyle || isDeletingStyle;
      case "Size":
        return isCreatingSize || isUpdatingSize || isDeletingSize;
      default:
        return false;
    }
  };

  const handleOpenModal = (item?: AttributeItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        slug: item.slug || "",
        sortOrder: item.sortOrder || 10,
        isActive: item.isActive,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        slug: "",
        sortOrder: 10,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      name: "",
      slug: "",
      sortOrder: 10,
      isActive: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload: any = {
        name: formData.name,
        isActive: formData.isActive,
      };

      if (activeTab === "Category") {
        payload.slug =
          formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-");
      } else if (activeTab === "Size") {
        payload.sortOrder = formData.sortOrder;
      }

      if (editingItem) {
        // Update operation
        switch (activeTab) {
          case "Category":
            await updateCategoryFn({
              id: editingItem._id,
              data: payload,
            }).unwrap();
            break;
          case "Style":
            await updateStyleFn({
              id: editingItem._id,
              data: payload,
            }).unwrap();
            break;
          case "Size":
            await updateSizeFn({ id: editingItem._id, data: payload }).unwrap();
            break;
        }
        toast.success(`${activeTab} updated successfully`);
      } else {
        // Create operation
        switch (activeTab) {
          case "Category":
            await createCategoryFn(payload).unwrap();
            break;
          case "Style":
            await createStyleFn(payload).unwrap();
            break;
          case "Size":
            await createSizeFn(payload).unwrap();
            break;
        }
        toast.success(`${activeTab} created successfully`);
      }

      switch (activeTab) {
        case "Category":
          refetchCategories();
          break;
        case "Style":
          refetchStyles();
          break;
        case "Size":
          refetchSizes();
          break;
      }

      handleCloseModal();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          `Failed to ${editingItem ? "update" : "create"} ${activeTab.toLowerCase()}`,
      );
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `You are about to delete the <strong>${activeTab.toLowerCase()}</strong>: <strong>"${name}"</strong>`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-lg",
        title: "text-xl font-bold",
        confirmButton: "px-4 py-2 text-sm font-medium",
        cancelButton: "px-4 py-2 text-sm font-medium",
      },
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while we delete the item.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        switch (activeTab) {
          case "Category":
            await deleteCategoryFn(id).unwrap();
            refetchCategories();
            break;
          case "Style":
            await deleteStyleFn(id).unwrap();
            refetchStyles();
            break;
          case "Size":
            await deleteSizeFn(id).unwrap();
            refetchSizes();
            break;
        }

        await Swal.fire({
          title: "Deleted!",
          text: `${activeTab} has been deleted successfully.`,
          icon: "success",
          confirmButtonColor: "#22c55e",
          timer: 2000,
          timerProgressBar: true,
        });

        // toast.success(`${activeTab} deleted successfully`);
      } catch (error: any) {
        await Swal.fire({
          title: "Error!",
          text:
            error?.data?.message ||
            `Failed to delete ${activeTab.toLowerCase()}`,
          icon: "error",
          confirmButtonColor: "#d33",
        });
        toast.error(
          error?.data?.message || `Failed to delete ${activeTab.toLowerCase()}`,
        );
      }
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    switch (activeTab) {
      case "Category":
        refetchCategories();
        break;
      case "Style":
        refetchStyles();
        break;
      case "Size":
        refetchSizes();
        break;
    }
  }, [activeTab, refetchCategories, refetchStyles, refetchSizes]);

  return (
    <div className="space-y-6 relative">
      <AttributesHeader
        activeTab={activeTab}
        onAddClick={() => handleOpenModal()}
        isLoading={getIsLoading()}
      />

      <AttributesTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={["Category", "Style", "Size"]}
      />

      <AttributesTable
        data={getActiveData()}
        activeTab={activeTab}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        isLoading={getIsLoading()}
      />

      <AttributeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onFormChange={handleFormChange}
        editingItem={editingItem}
        activeTab={activeTab}
        isLoading={getIsLoading()}
      />
    </div>
  );
}
