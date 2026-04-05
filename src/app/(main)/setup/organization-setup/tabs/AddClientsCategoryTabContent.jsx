"use client";

import React, { useState, useEffect, useMemo } from "react";
import FieldWrapper from "@/components/ui/FieldWrapper";
import Input from "@/components/ui/Input";
import FormActions from "../components/FormActions";
import SearchList from "../components/SearchList";
import EditModal from "../components/EditModal";
import ViewModal from "../components/ViewModal";
import { useClientCategories } from "@/hooks/client-category/useClientCategories";
import { useCreateClientCategory } from "@/hooks/client-category/useCreateClientCategory";
import { useUpdateClientCategory } from "@/hooks/client-category/useUpdateClientCategory";
import { useDeleteClientCategory } from "@/hooks/client-category/useDeleteClientCategory";

const AddClientsCategoryTabContent = () => {
  // Add form states (for creating new categories)
  const [categoryName, setCategoryName] = useState("");

  // Edit form states (for editing existing categories)
  const [editCategoryName, setEditCategoryName] = useState("");

  // Local state for optimistic updates
  const [localCategories, setLocalCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  // API hooks
  const { data, isLoading, error, isFetching, refetch } = useClientCategories();

  const { mutate: deleteCategory } = useDeleteClientCategory({
    onSuccess: () => refetch(),
  });

  const {
    mutate: updateCategory,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = useUpdateClientCategory({
    onSuccess: () => {
      resetEditForm();
      setShowEditModal(false);
      refetch();
    },
  });

  const { mutate: toggleStatus } = useUpdateClientCategory();

  const { mutate: createCategory, isPending: isCreating } = useCreateClientCategory({
    onSuccess: () => {
      resetForm();
      setTimeout(() => refetch(), 1000);
    },
  });

  // Sync localCategories with data whenever data changes
  useEffect(() => {
    if (!isLoading && !error && data) {
      const mapped = data.map((category) => ({
        id: category.categoryId,
        name: category.categoryName,
        categoryName: category.categoryName,
        isActive: category.isActive,
      }));
      setLocalCategories(mapped);
    }
  }, [data, isLoading, error]);

  const categories = useMemo(() => {
    if (isLoading || error) return [];
    return localCategories;
  }, [localCategories, isLoading, error]);

  const resetForm = () => {
    setCategoryName("");
    setSelectedCategory(null);
  };

  const resetEditForm = () => {
    setEditCategoryName("");
  };

  const handleCreateCategory = () => {
    if (!categoryName.trim()) return;
    createCategory({
      categoryName,
      isActive: true,
    });
  };

  const handleDeleteCategory = (itemName, index) => {
    if (categories[index]?.id) {
      deleteCategory(categories[index].id);
    }
  };

  const handleEditCategory = (item) => {
    setSelectedCategory(item);
    setEditCategoryName(item.categoryName);
    setShowEditModal(true);
  };

  const handleUpdateCategory = (onSuccess) => {
    if (!editCategoryName.trim() || !selectedCategory) return;
    updateCategory(
      {
        id: selectedCategory.id,
        payload: {
          categoryName: editCategoryName,
          isActive: selectedCategory.isActive,
        },
      },
      { onSuccess }
    );
  };

  const handleToggleCategory = (item) => {
    if (item?.id) {
      setLocalCategories((prev) =>
        prev.map((category) =>
          category.id === item.id
            ? { ...category, isActive: !category.isActive }
            : category
        )
      );
      toggleStatus({ id: item.id, payload: { isActive: !item.isActive } });
    }
  };

  const handleViewCategory = (item) => {
    setViewItem(item);
    setShowViewModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    resetEditForm();
    resetUpdateError?.();
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewItem(null);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* SECTION 1: Create Category */}
      <div className="pb-6 md:pb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
          Add Client Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <FieldWrapper label="Category Name" required className="text-sm">
              <Input
                placeholder="Enter category name"
                className="text-sm"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Category ID" className="text-sm">
              <Input
                placeholder="Auto-generated"
                className="text-sm bg-gray-50"
                value="Auto"
                readOnly
              />
            </FieldWrapper>
          </div>
        </div>

        <FormActions onSave={handleCreateCategory} tabName="Client Category" />
      </div>

      {/* SECTION 2: Search Categories */}
      <div className="pb-6 md:pb-8">
        <SearchList
          isLoading={isLoading || isFetching}
          error={error?.message}
          items={categories}
          showView={true}
          showEdit={true}
          showDelete={true}
          showToggle={true}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onView={handleViewCategory}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          onToggle={handleToggleCategory}
          tabName="Client Category"
        />
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={showEditModal}
        selectedItem={selectedCategory}
        onUpdate={handleUpdateCategory}
        onClose={handleCloseEditModal}
        isUpdating={isUpdating}
        error={updateError?.message}
        title="Edit Client Category"
        itemType="Client Category"
        fields={[
          { label: "Category Name", value: editCategoryName, onChange: setEditCategoryName },
        ]}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={showViewModal}
        item={viewItem}
        onClose={handleCloseViewModal}
        title="Client Category Details"
        fields={[
          { key: "id", label: "Category ID" },
          { key: "categoryName", label: "Category Name" },
          {
            key: "isActive",
            label: "Status",
            render: (value) => (value ? "Active" : "Inactive"),
          },
        ]}
      />
    </div>
  );
};

export default AddClientsCategoryTabContent;
