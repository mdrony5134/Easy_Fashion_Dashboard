// app/admin/products/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { Product } from "@/types/productTypes";
import Pagination from "@/components/ui/Pagination";
import { 
  useCreateProductMutation, 
  useDeleteProductMutation, 
  useGetProductListQuery, 
  useUpdateProductMutation 
} from "@/redux/api/productApi";
import ProductsHeader from "./ProductsHeader";
import ProductsTable from "@/components/table/ProductsTable";
import ProductModal from "./ProductModal";
import ProductDetailsModal from "./ProductDetailsModal";


export default function ProductsManagement() {
  const role = useSelector((state: RootState) => state.auth.role);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: productsData, refetch, isLoading } = useGetProductListQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
  });

  const [createProductFn, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProductFn, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProductFn, { isLoading: isDeleting }] = useDeleteProductMutation();

  const products = productsData?.data || [];
  const meta = productsData?.meta || { total: 0, totalPages: 1 };

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseViewModal = () => {
    setSelectedProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleCloseEditModal = () => {
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `You are about to delete the product: <strong>"${name}"</strong>`,
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteProductFn(id).unwrap();
        toast.success("Product deleted successfully");
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete product");
      }
    }
  };

  const handleProductSubmit = async (formData: FormData) => {
    try {
      if (editingProduct) {
        await updateProductFn({ id: editingProduct._id, data: formData }).unwrap();
        toast.success("Product updated successfully");
        setEditingProduct(null);
      } else {
        await createProductFn(formData).unwrap();
        toast.success("Product created successfully");
      }
      setIsAddModalOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save product");
      throw error;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, searchTerm, refetch]);

  return (
    <div className="space-y-6 relative">
      <ProductsHeader 
        onAddClick={role !== "MANAGER" ? handleAddProduct : undefined} 
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      <ProductsTable
        products={products}
        onView={handleViewProduct}
        onEdit={role !== "MANAGER" ? handleEditProduct : undefined}
        onDelete={role !== "MANAGER" ? handleDeleteProduct : undefined}
        isLoading={isLoading}
        isDeleting={isDeleting}
      />

      {meta.total > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={meta.total}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}

      <ProductModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSubmit={handleProductSubmit}
        mode="create"
        title="Add New Product"
        isLoading={isCreating}
      />

      <ProductDetailsModal
        isOpen={!!selectedProduct}
        onClose={handleCloseViewModal}
        product={selectedProduct}
      />

      <ProductModal
        isOpen={!!editingProduct}
        onClose={handleCloseEditModal}
        onSubmit={handleProductSubmit}
        mode="edit"
        title="Edit Product"
        initialData={editingProduct || undefined}
        isLoading={isUpdating}
      />
    </div>
  );
}