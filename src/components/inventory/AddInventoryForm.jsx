"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiX, FiSave, FiUpload } from "react-icons/fi";
import { useInventoryContext } from "@/context/inventoryContext";
import { inventoryCategories } from "@/data/inventoryData";

// Validation schema
const inventorySchema = yup.object().shape({
  name: yup.string().required("Item name is required"),
  sku: yup.string().required("SKU is required"),
  description: yup.string().optional(),
  category: yup.string().required("Category is required"),
  quantity: yup.number().required("Quantity is required").min(0, "Quantity must be at least 0"),
  minQuantity: yup.number().required("Minimum quantity is required").min(0, "Minimum quantity must be at least 0"),
  maxQuantity: yup.number().required("Maximum quantity is required").min(0, "Maximum quantity must be at least 0"),
  unitPrice: yup.number().required("Unit price is required").min(0, "Unit price must be at least 0"),
  supplier: yup.string().required("Supplier is required"),
  location: yup.string().required("Location is required"),
  status: yup.string().required("Status is required"),
});

const AddInventoryForm = () => {
  const { closeAddInventoryForm } = useInventoryContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(inventorySchema),
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      category: "",
      quantity: 0,
      minQuantity: 10,
      maxQuantity: 100,
      unitPrice: 0,
      supplier: "",
      location: "",
      status: "in_stock",
    },
  });

  const watchedQuantity = watch("quantity");
  const watchedUnitPrice = watch("unitPrice");

  // Calculate total price
  const totalPrice = (watchedQuantity || 0) * (watchedUnitPrice || 0);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("New inventory item:", { ...data, totalPrice: totalPrice.toFixed(2) });
      
      // Show success message (you can integrate with a toast library)
      alert("Inventory item added successfully!");
      
      reset();
      closeAddInventoryForm();
    } catch (error) {
      console.error("Error adding inventory item:", error);
      alert("Error adding inventory item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSKU = () => {
    const prefix = "INV";
    const randomNum = Math.floor(Math.random() * 10000);
    setValue("sku", `${prefix}-${randomNum.toString().padStart(4, '0')}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Add New Inventory Item</h2>
          <p className="text-gray-600 mt-1">Enter the details for the new inventory item</p>
        </div>
        <button
          onClick={closeAddInventoryForm}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name *
              </label>
              <input
                type="text"
                {...register("name")}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter item name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  {...register("sku")}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent ${
                    errors.sku ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter SKU"
                />
                <button
                  type="button"
                  onClick={generateSKU}
                  className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Generate
                </button>
              </div>
              {errors.sku && (
                <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter item description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                {...register("category")}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a category</option>
                {inventoryCategories.filter(cat => cat.value !== "all").map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>
          </div>

          {/* Stock & Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Stock & Pricing</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  {...register("quantity", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent ${
                    errors.quantity ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0"
                  min="0"
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Qty *
                </label>
                <input
                  type="number"
                  {...register("minQuantity", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent ${
                    errors.minQuantity ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="10"
                  min="0"
                />
                {errors.minQuantity && (
                  <p className="mt-1 text-sm text-red-600">{errors.minQuantity.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Qty *
                </label>
                <input
                  type="number"
                  {...register("maxQuantity", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent ${
                    errors.maxQuantity ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="100"
                  min="0"
                />
                {errors.maxQuantity && (
                  <p className="mt-1 text-sm text-red-600">{errors.maxQuantity.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                {...register("unitPrice", { valueAsNumber: true })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent ${
                  errors.unitPrice ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
                min="0"
              />
              {errors.unitPrice && (
                <p className="mt-1 text-sm text-red-600">{errors.unitPrice.message}</p>
              )}
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Total Value:</span>
                <span className="text-lg font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                {...register("status")}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="discontinued">Discontinued</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplier *
            </label>
            <input
              type="text"
              {...register("supplier")}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent ${
                errors.supplier ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter supplier name"
            />
            {errors.supplier && (
              <p className="mt-1 text-sm text-red-600">{errors.supplier.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Storage Location *
            </label>
            <input
              type="text"
              {...register("location")}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Warehouse 1-A1"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <FiUpload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              // You can add file upload logic here
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={closeAddInventoryForm}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-customGreen text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiSave className="w-4 h-4" />
            {isSubmitting ? "Saving..." : "Save Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventoryForm;
