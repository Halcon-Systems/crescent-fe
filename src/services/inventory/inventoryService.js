import { userRequest } from '@/lib/RequestMethods';

const API_BASE = '/inventory/inventory';

/**
 * Inventory Service - Real-time stock level management and queries
 */
const inventoryService = {
  /**
   * Fetch inventory for a store
   * @param {string} storeId - Store ID
   * @param {object} options - Pagination and filters
   * @returns {Promise} {store, inventories, totalItems, summary}
   */
  async fetchStoreInventory(storeId, options = {}) {
    try {
      const response = await userRequest.get(`${API_BASE}/stock-levels/${storeId}`, { params: options });
      return response.data;
    } catch (error) {
      console.error(`Error fetching inventory for store ${storeId}:`, error);
      throw error;
    }
  },

  /**
   * Get inventory for single item
   * @param {string} itemId - Item ID
   * @returns {Promise} Inventory record for all stores
   */
  async fetchItemInventory(itemId) {
    try {
      const response = await userRequest.get(`${API_BASE}/item/${itemId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching inventory for item:`, error);
      throw error;
    }
    },

  /**
   * Get available stock for item (quantityAvailable)
   * @param {string} itemId - Item ID
   * @param {string} storeId - Store ID
   * @returns {Promise} Available quantity
   */
  async getAvailableStock(itemId, storeId) {
    try {
      const response = await userRequest.get(
        `${API_BASE}/available`,
        { params: { itemId, storeId } }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching available stock:', error);
      throw error;
    }
  },

  /**
   * Get low stock items (below minimum level)
   * @param {string} storeId - Store ID (optional)
   * @returns {Promise} Array of low stock items
   */
  async getLowStockItems(storeId) {
    try {
      const params = storeId ? { storeId } : {};
      const response = await userRequest.get(`${API_BASE}/low-stock`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      throw error;
    }
  },

  /**
   * Get overstock items (above maximum level)
   * @param {string} storeId - Store ID (optional)
   * @returns {Promise} Array of overstock items
   */
  async getOverstockItems(storeId) {
    try {
      const params = storeId ? { storeId } : {};
      const response = await userRequest.get(`${API_BASE}/overstock`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching overstock items:', error);
      throw error;
    }
  },

  /**
   * Get inventory count summary
   * @returns {Promise} {totalItems, totalQuantity, totalValue, lowStockCount}
   */
  async getInventorySummary() {
    try {
      const response = await userRequest.get(`${API_BASE}/summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory summary:', error);
      throw error;
    }
  },

  /**
   * Update inventory count (cycle count)
   * @param {string} storeId - Store ID
   * @param {object} data - Count results {items: [{itemId, countedQuantity, adjustmentNotes}]}
   * @returns {Promise} Updated inventory and stock movements
   */
  async updateInventoryCount(storeId, data) {
    try {
      const response = await userRequest.post(
        `${API_BASE}/${storeId}/count`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error updating inventory count:', error);
      throw error;
    }
  },

  /**
   * Search inventory by item name or SKU
   * @param {string} searchTerm - Search term
   * @param {string} storeId - Store ID (optional)
   * @returns {Promise} Matching inventory records
   */
  async searchInventory(searchTerm, storeId) {
    try {
      const params = { q: searchTerm };
      if (storeId) params.storeId = storeId;
      const response = await userRequest.get(`${API_BASE}/search`, { params });
      return response.data;
    } catch (error) {
      console.error('Error searching inventory:', error);
      throw error;
    }
  }
};

export default inventoryService;
