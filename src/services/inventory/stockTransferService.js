import { userRequest } from '@/lib/RequestMethods';

const API_BASE = '/inventory/stock-transfers';

/**
 * Stock Transfer Service - Inter-store transfers (DRAFT → IN_TRANSIT → RECEIVED)
 */
const stockTransferService = {
  /**
   * Fetch all stock transfers
   * @param {object} options - Pagination and filters {page, limit, status, fromStoreId, toStoreId}
   * @returns {Promise} {data: [], total: number, page: number}
   */
  async fetchStockTransfers(options = {}) {
    try {
      const response = await userRequest.get(API_BASE, { params: options });
      return response.data;
    } catch (error) {
      console.error('Error fetching stock transfers:', error);
      throw error;
    }
  },

  /**
   * Fetch single transfer
   * @param {string} id - Transfer ID
   * @returns {Promise} Transfer data with line items
   */
  async fetchStockTransferById(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transfer ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new stock transfer
   * @param {object} transferData - Transfer details {fromStoreId, toStoreId, items: [], notes}
   * @returns {Promise} Created transfer with status=DRAFT
   */
  async createStockTransfer(transferData) {
    try {
      const response = await userRequest.post(API_BASE, transferData);
      return response.data;
    } catch (error) {
      console.error('Error creating stock transfer:', error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Invalid transfer data');
      }
      throw error;
    }
  },

  /**
   * Update transfer (only in DRAFT status)
   * @param {string} id - Transfer ID
   * @param {object} transferData - Updated data
   * @returns {Promise} Updated transfer
   */
  async updateStockTransfer(id, transferData) {
    try {
      const response = await userRequest.patch(`${API_BASE}/${id}`, transferData);
      return response.data;
    } catch (error) {
      console.error(`Error updating transfer ${id}:`, error);
      throw error;
    }
  },

  /**
   * Initiate transfer (DRAFT → IN_TRANSIT)
   * @param {string} id - Transfer ID
   * @returns {Promise} Updated transfer
   */
  async initiateTransfer(id) {
    try {
      const response = await userRequest.post(`${API_BASE}/${id}/initiate`);
      return response.data;
    } catch (error) {
      console.error(`Error initiating transfer ${id}:`, error);
      throw error;
    }
  },

  /**
   * Receive transfer (IN_TRANSIT → RECEIVED)
   * Updates destination store inventory and creates stock movements
   * @param {string} id - Transfer ID
   * @param {object} data - Receipt data {items: [{itemId, quantityReceived}]}
   * @returns {Promise} Received transfer with updated inventory
   */
  async receiveTransfer(id, data) {
    try {
      const response = await userRequest.post(`${API_BASE}/${id}/receive`, data);
      return response.data;
    } catch (error) {
      console.error(`Error receiving transfer ${id}:`, error);
      throw error;
    }
  },

  /**
   * Cancel transfer (DRAFT or IN_TRANSIT)
   * @param {string} id - Transfer ID
   * @param {object} data - Cancellation reason {reason}
   * @returns {Promise} Cancelled transfer
   */
  async cancelTransfer(id, data) {
    try {
      const response = await userRequest.post(`${API_BASE}/${id}/cancel`, data);
      return response.data;
    } catch (error) {
      console.error(`Error cancelling transfer ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete transfer (DRAFT only)
   * @param {string} id - Transfer ID
   * @returns {Promise} Deletion confirmation
   */
  async deleteStockTransfer(id) {
    try {
      const response = await userRequest.delete(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting transfer ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get transfer line items
   * @param {string} id - Transfer ID
   * @returns {Promise} Array of line items
   */
  async getTransferItems(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}/items`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transfer items:`, error);
      throw error;
    }
  }
};

export default stockTransferService;
