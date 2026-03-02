import { userRequest } from '@/lib/RequestMethods';

const API_BASE = '/inventory/categories';

/**
 * Category Service - Manage item categories
 */
const categoryService = {
  /**
   * Fetch all categories
   * @returns {Promise} List of categories
   */
  async fetchCategories() {
    try {
      const response = await userRequest.get(API_BASE);
      console.log('[categoryService.fetchCategories] Response:', response);
      // Backend returns PaginatedResponse wrapped by TransformInterceptor
      // Structure: { status, message, data: { data: [...], total, page, limit, totalPages } }
      const paginatedData = response.data?.data;
      if (!paginatedData) {
        console.warn('[categoryService] No paginated data found');
        return [];
      }
      // Return the categories array from within the pagination object
      const categoriesArray = paginatedData.data || [];
      console.log('[categoryService] Extracted categories:', categoriesArray);
      return categoriesArray;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  /**
   * Fetch single category
   * @param {string} id - Category ID
   * @returns {Promise} Category data
   */
  async fetchCategoryById(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}`);
      // Handle wrapped response: { status, message, data: categoryObject }
      return response.data?.data || response.data || {};
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new category
   * @param {object} categoryData - Category details {name, description}
   * @returns {Promise} Created category
   */
  async createCategory(categoryData) {
    try {
      const response = await userRequest.post(API_BASE, categoryData);
      // Handle wrapped response: { status, message, data: categoryObject }
      console.log('[categoryService.createCategory] Response:', response);
      return response.data?.data || response.data || {};
    } catch (error) {
      console.error('Error creating category:', error);
      if (error.response?.status === 409) {
        throw new Error('Category name already exists');
      }
      throw error;
    }
  },

  /**
   * Update category
   * @param {string} id - Category ID
   * @param {object} categoryData - Updated category data
   * @returns {Promise} Updated category
   */
  async updateCategory(id, categoryData) {
    try {
      const response = await userRequest.patch(`${API_BASE}/${id}`, categoryData);
      // Handle wrapped response: { status, message, data: categoryObject }
      return response.data?.data || response.data || {};
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete category
   * @param {string} id - Category ID
   * @returns {Promise} Deletion confirmation
   */
  async deleteCategory(id) {
    try {
      const response = await userRequest.delete(`${API_BASE}/${id}`);
      // Handle wrapped response: { status, message, data: ... }
      return response.data?.data || response.data || {};
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  }
};

export default categoryService;
