import { userRequest } from '@/lib/RequestMethods';
import toast from 'react-hot-toast';

const API_BASE = '/inventory/items';

/**
 * Item Service - Handle all item master CRUD operations
 */
const itemService = {
  /**
   * Fetch all items with pagination
   * @param {number} page - Page number (1-indexed)
   * @param {number} limit - Items per page
   * @param {object} filters - Filter criteria {search, category, group}
   * @returns {Promise} {items: [], total: number, page: number, totalPages: number}
   */
  async fetchItems(page = 1, limit = 10, filters = {}) {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...filters
      });
      const response = await userRequest.get(`${API_BASE}?${params}`);
      // Backend returns PaginatedResponse wrapped by TransformInterceptor
      // Structure: { status, message, data: { data: [...], total, page, limit, totalPages } }
      const paginatedData = response.data?.data;
      if (!paginatedData) return { data: [], total: 0, page: 1, limit, totalPages: 0 };
      return paginatedData;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  /**
   * Fetch single item by ID
   * @param {string} id - Item ID
   * @returns {Promise} Item data
   */
  async fetchItemById(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new item
   * @param {object} itemData - Item details {name, sku, barcode, category, group, ...}
   * @returns {Promise} Created item with ID
   */
  async createItem(itemData) {
    try {
      const response = await userRequest.post(API_BASE, itemData);
      return response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Invalid item data');
      }
      if (error.response?.status === 409) {
        throw new Error('SKU or barcode already exists');
      }
      throw error;
    }
  },

  /**
   * Update existing item
   * @param {string} id - Item ID
   * @param {object} itemData - Updated item data
   * @returns {Promise} Updated item
   */
  async updateItem(id, itemData) {
    try {
      const response = await userRequest.put(`${API_BASE}/${id}`, itemData);
      return response.data;
    } catch (error) {
      console.error(`Error updating item ${id}:`, error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Invalid item data');
      }
      throw error;
    }
  },

  /**
   * Delete item
   * @param {string} id - Item ID
   * @returns {Promise} Deletion confirmation
   */
  async deleteItem(id) {
    try {
      const response = await userRequest.delete(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting item ${id}:`, error);
      throw error;
    }
  },

  /**
   * Search items by name or SKU
   * @param {string} searchTerm - Search term
   * @returns {Promise} Matching items
   */
  async searchItems(searchTerm) {
    try {
      const response = await userRequest.get(`${API_BASE}/search`, {
        params: { q: searchTerm }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching items:', error);
      throw error;
    }
  },

  /**
   * Get items by category
   * @param {string} categoryId - Category ID
   * @returns {Promise} Items in category
   */
  async getItemsByCategory(categoryId) {
    try {
      const response = await userRequest.get(`${API_BASE}?categoryId=${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching items by category:', error);
      throw error;
    }
  },

  /**
   * Get low stock items
   * @returns {Promise} Items below minimum stock level
   */
  async getLowStockItems() {
    try {
      const response = await userRequest.get(`${API_BASE}/low-stock`);
      return response.data;
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      throw error;
    }
  }
};

export default itemService;
