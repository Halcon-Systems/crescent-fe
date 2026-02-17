"use client";

import React, { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";

const InventorySidebar = ({ filters, onFilterChange, categories, statuses }) => {
  const [priceRange, setPriceRange] = useState({
    min: filters.priceRange.min,
    max: filters.priceRange.max
  });

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    onFilterChange({ priceRange: newPriceRange });
  };

  const clearFilters = () => {
    onFilterChange({
      category: "all",
      status: "all",
      priceRange: { min: 0, max: 10000 }
    });
    setPriceRange({ min: 0, max: 10000 });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label} ({category.count})
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label} ({status.count})
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min Price</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max Price</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', parseFloat(e.target.value) || 10000)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent"
                placeholder="10000"
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h4>
          <div className="space-y-2">
            {categories.slice(0, 4).map((category) => (
              <div key={category.value} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{category.label}</span>
                <span className="text-sm font-medium text-gray-900">{category.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySidebar;
