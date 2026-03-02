import { userRequest } from '@/lib/RequestMethods';

const API_BASE = '/inventory/stores';

/**
 * Store Service - Manage warehouse/store locations
 */
const storeService = {
  /**
   * Fetch all stores
   * @param {object} filters - Optional filters
   * @returns {Promise} List of stores
   */
  async fetchStores(filters = {}) {
    try {
      // Provide default pagination values to match backend DTO expectations
      const params = {
        page: 1,
        limit: 100,
        ...filters
      };
      const response = await userRequest.get(API_BASE, { params });
      
      // Backend stores.service.findAll() returns PaginatedResponse: { data: [...], total, page, limit, totalPages }
      // TransformInterceptor wraps it: { status, message, data: { data: [...], total, page, limit, totalPages } }
      // So we need to access response.data.data to get the pagination object
      const paginatedData = response.data?.data;
      if (!paginatedData) {
        console.warn('Unexpected stores response structure:', response.data);
        return [];
      }
      
      // Return the stores array from within the pagination object
      return paginatedData.data || [];
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw error;
    }
  },

  /**
   * Fetch single store
   * @param {string} id - Store ID
   * @returns {Promise} Store data
   */
  async fetchStoreById(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}`);
      // Handle wrapped response: { status, message, data: storeObject }
      return response.data?.data || response.data || {};
    } catch (error) {
      console.error(`Error fetching store ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new store
   * @param {object} storeData - Store details {name, location, address, capacity, ...}
   * @returns {Promise} Created store
   */
  async createStore(storeData) {
    try {
      const response = await userRequest.post(API_BASE, storeData);
      // Handle wrapped response: { status, message, data: storeObject }
      console.log('[storeService.createStore] Response:', response);
      return response.data?.data || response.data || {};
    } catch (error) {
      console.error('Error creating store:', error);
      if (error.response?.status === 409) {
        throw new Error('Store name already exists in this organization');
      }
      throw error;
    }
  },

  /**
   * Update store
   * @param {string} id - Store ID
   * @param {object} storeData - Updated store data
   * @returns {Promise} Updated store
   */
  async updateStore(id, storeData) {
    try {
      const response = await userRequest.patch(`${API_BASE}/${id}`, storeData);
      // Handle wrapped response: { status, message, data: storeObject }
      return response.data?.data || response.data || {};
    } catch (error) {
      console.error(`Error updating store ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete store (soft delete)
   * @param {string} id - Store ID
   * @returns {Promise} Deletion confirmation
   */
  async deleteStore(id) {
    try {
      const response = await userRequest.delete(`${API_BASE}/${id}`);
      // Handle wrapped response: { status, message, data: ... }
      return response.data?.data || response.data || {};
    } catch (error) {
      console.error(`Error deleting store ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get store inventory
   * @param {string} id - Store ID
   * @returns {Promise} Inventory items in store
   */
  async getStoreInventory(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}/inventory`);
      // Handle wrapped response
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error(`Error fetching store inventory:`, error);
      throw error;
    }
  },

  /**
   * Get store stock movements (audit trail)
   * @param {string} id - Store ID
   * @param {object} options - Pagination and filters
   * @returns {Promise} Stock movements
   */
  async getStoreMovements(id, options = {}) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}/movements`, { params: options });
      // Handle wrapped response
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error(`Error fetching store movements:`, error);
      throw error;
    }
  }
};

export default storeService;
