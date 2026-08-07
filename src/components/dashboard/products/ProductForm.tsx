"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { X, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import {
  useGetAllCategoriesQuery,
  useGetAllSizesQuery,
  useGetAllStylesQuery,
} from "@/redux/api/productAttributeApi";

interface ProductFormValues {
  name: string;
  description: string;
  category: string;
  style: string;
  price: number;
  stock: number;
  sizes: string[];
}

interface ProductFormProps {
  initialData?: any;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

export default function ProductForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  mode,
}: ProductFormProps) {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const { data: categoriesData } = useGetAllCategoriesQuery({});
  const { data: stylesData } = useGetAllStylesQuery({});
  const { data: sizesData } = useGetAllSizesQuery({});

  const categories = categoriesData?.data || [];
  const styles = stylesData?.data || [];
  const sizes = sizesData?.data || [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    defaultValues: initialData
      ? {
          name: initialData.name || "",
          description: initialData.description || "",
          category: initialData.category?._id || "",
          style: initialData.style?._id || "",
          price: initialData.price ? initialData.price / 100 : 0,
          stock: initialData.stock || 0,
          sizes: initialData.sizes?.map((s: any) => s._id) || [],
        }
      : {
          name: "",
          description: "",
          category: "",
          style: "",
          price: 0,
          stock: 1,
          sizes: [],
        },
  });

  useEffect(() => {
    if (initialData?.images?.length > 0) {
      setExistingImages(initialData.images);
      setImagePreviews(initialData.images);
    }
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      const oversizedFiles = newFiles.filter(
        (file) => file.size > 5 * 1024 * 1024,
      );
      if (oversizedFiles.length > 0) {
        toast.error("Some images exceed 5MB limit.");
        return;
      }

      setImages((prev) => [...prev, ...newFiles]);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    if (initialData?.images && index < initialData.images.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    }

    const imageIndex = index - (initialData?.images?.length || 0);
    if (imageIndex >= 0) {
      setImages((prev) => prev.filter((_, i) => i !== imageIndex));
    }
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onFormSubmit = async (data: ProductFormValues) => {
    try {
      if (imagePreviews.length === 0) {
        toast.error("Please upload at least one product image.");
        return;
      }

      if (data.sizes.length === 0) {
        toast.error("Please select at least one size.");
        return;
      }

      const formData = new FormData();

      const bodyData = {
        name: data.name,
        category: data.category,
        style: data.style,
        sizes: data.sizes,
        price: Math.round(data.price * 100),
        stock: data.stock,
        description: data.description,
      };

      formData.append("bodyData", JSON.stringify(bodyData));

      images.forEach((image) => {
        formData.append("images", image);
      });

      if (mode === "edit" && existingImages.length > 0) {
        formData.append("existingImages", JSON.stringify(existingImages));
      }

      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const isSubmittingForm = isSubmitting || isLoading;

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {mode === "edit" ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-sm text-gray-500">
          {mode === "edit"
            ? "Update the information below to modify this product."
            : "Fill in the information below to create a new product."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: "Product name is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              placeholder="e.g. Classic Green T-Shirt"
              disabled={isSubmittingForm}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              placeholder="Detailed product description..."
              disabled={isSubmittingForm}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                disabled={isSubmittingForm}
              >
                <option value="">Select Category</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style <span className="text-red-500">*</span>
              </label>
              <select
                {...register("style", { required: "Style is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                disabled={isSubmittingForm}
              >
                <option value="">Select Style</option>
                {styles.map((style: any) => (
                  <option key={style._id} value={style._id}>
                    {style.name}
                  </option>
                ))}
              </select>
              {errors.style && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.style.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (৳) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                placeholder="0.00"
                disabled={isSubmittingForm}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("stock", {
                  required: "Stock is required",
                  min: 0,
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                placeholder="e.g. 100"
                disabled={isSubmittingForm}
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4 mb-4">
              {imagePreviews.map((preview, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group"
                >
                  <Image
                    src={preview}
                    alt={`Product image ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    disabled={isSubmittingForm}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}

              {imagePreviews.length < 8 && (
                <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#4CAF50] transition-colors hover:bg-gray-50">
                  <Plus className="w-6 h-6 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-1">Add Image</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isSubmittingForm}
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-500">
              {imagePreviews.length > 0
                ? `${imagePreviews.length} image(s) uploaded. Maximum 8 images allowed.`
                : "Upload at least 1 image. Maximum 8 images."}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Sizes <span className="text-red-500">*</span>
            </label>
            <Controller
              name="sizes"
              control={control}
              rules={{ required: "Please select at least one size" }}
              render={({ field }) => (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size: any) => (
                      <button
                        type="button"
                        key={size._id}
                        onClick={() => {
                          if (isSubmittingForm) return;
                          const current = field.value || [];
                          const newValue = current.includes(size._id)
                            ? current.filter((s) => s !== size._id)
                            : [...current, size._id];
                          field.onChange(newValue);
                        }}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                          field.value?.includes(size._id)
                            ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-[#4CAF50]"
                        } ${isSubmittingForm ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                  {errors.sizes && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.sizes.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6 flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmittingForm}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmittingForm}
          className="px-6 py-2 bg-brand-red text-white rounded-lg font-medium disabled:opacity-50 flex items-center gap-2 transition-colors hover:bg-red-700"
        >
          {isSubmittingForm ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {mode === "edit" ? "Updating..." : "Creating..."}
            </>
          ) : mode === "edit" ? (
            "Update Product"
          ) : (
            "Create Product"
          )}
        </button>
      </div>
    </form>
  );
}