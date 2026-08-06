"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Upload, X, Plus } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ProductFormValues {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  sizes: string[];
  styles: string[];
}

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    defaultValues: initialData ? {
      name: initialData.name,
      description: initialData.description,
      category: initialData.category?.name || "",
      price: initialData.price ? initialData.price / 100 : 0,
      quantity: initialData.stock || 0,
      sizes: initialData.sizes?.map((s: any) => s.name) || [],
      styles: initialData.style ? [initialData.style.name] : [],
    } : {
      sizes: [],
      styles: [],
      quantity: 1,
    }
  });

  // Pre-load images if editing
  React.useEffect(() => {
    if (initialData?.images?.length > 0) {
      setImagePreviews(initialData.images);
    }
  }, [initialData]);

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const availableStyles = ["Casual", "Formal", "Streetwear", "Sport", "Vintage"];
  const categories = ["Men's", "Women's", "Kids", "Accessories", "Footwear"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      if (images.length === 0) {
        toast.error("Please upload at least one product image.");
        return;
      }
      
      console.log("Form Data:", data);
      console.log("Images:", images);
      
      // Mock API Call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Product created successfully!");
      
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-xl shadow-sm">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {initialData ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-sm text-gray-500">
          {initialData ? "Update the information below to modify this product." : "Fill in the information below to create a new product."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              {...register("name", { required: "Product name is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              placeholder="e.g. Classic Green T-Shirt"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              placeholder="Detailed product description..."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (৳)</label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: "Price is required", min: 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Quantity</label>
            <input
              type="number"
              {...register("quantity", { required: "Quantity is required", min: 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              placeholder="e.g. 100"
            />
            {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <div className="flex flex-wrap gap-4 mb-4">
              {imagePreviews.map((preview, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                  <Image src={preview} alt="preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-50"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
              
              <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#4CAF50] transition-colors">
                <Plus className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Add Image</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
            <Controller
              name="sizes"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => {
                        const current = field.value || [];
                        const newValue = current.includes(size)
                          ? current.filter((s) => s !== size)
                          : [...current, size];
                        field.onChange(newValue);
                      }}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        field.value?.includes(size)
                          ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#4CAF50]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          {/* Styles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Styles</label>
            <Controller
              name="styles"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {availableStyles.map((style) => (
                    <button
                      type="button"
                      key={style}
                      onClick={() => {
                        const current = field.value || [];
                        const newValue = current.includes(style)
                          ? current.filter((s) => s !== style)
                          : [...current, style];
                        field.onChange(newValue);
                      }}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        field.value?.includes(style)
                          ? "bg-[#E53935] text-white border-[#E53935]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#E53935]"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

        </div>
      </div>

      <div className="border-t pt-6 flex justify-end gap-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-green-600 font-medium disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  );
}
