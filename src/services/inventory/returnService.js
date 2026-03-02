import { userRequest } from '@/lib/RequestMethods';

const API_BASE = '/inventory/returns';

/**
 * Return Service - Track items returned by guards/staff
 */
const returnService = {
  /**
   * Fetch all returns
   * @param {object} options - Pagination and filters {page, limit, status, guardId, storeId}
   * @returns {Promise} {data: [], total: number, page: number}
   */
  async fetchReturns(options = {}) {
    try {
      const response = await userRequest.get(API_BASE, { params: options });
      return response.data;
    } catch (error) {
      console.error('Error fetching returns:', error);
      throw error;
    }
  },

  /**
   * Fetch single return record
   * @param {string} id - Return ID
   * @returns {Promise} Return data with line items
   */
  async fetchReturnById(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching return ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new return record
   * @param {object} returnData - Return details {issuanceId, guardId, storeId, items: [{itemId, quantityReturned, condition}], notes}
   * @returns {Promise} Created return record
   */
  async createReturn(returnData) {
    try {
      const response = await userRequest.post(API_BASE, returnData);
      return response.data;
    } catch (error) {
      console.error('Error creating return:', error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Invalid return data');
      }
      throw error;
    }
  },

  /**
   * Get returns for a guard
   * @param {string} guardId - Guard ID
   * @returns {Promise} Array of returns for that guard
   */
  async getGuardReturns(guardId) {
    try {
      const response = await userRequest.get(`${API_BASE}?guardId=${guardId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching guard returns:', error);
      throw error;
    }
  },

  /**
   * Get returns for an issuance
   * @param {string} issuanceId - Issuance ID
   * @returns {Promise} Array of returns for that issuance
   */
  async getIssuanceReturns(issuanceId) {
    try {
      const response = await userRequest.get(`${API_BASE}?issuanceId=${issuanceId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching issuance returns:', error);
      throw error;
    }
  },

  /**
   * Get return line items
   * @param {string} id - Return ID
   * @returns {Promise} Array of returned items
   */
  async getReturnItems(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}/items`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching return items:`, error);
      throw error;
    }
  },

  /**
   * Get return summary for guard
   * @param {string} guardId - Guard ID
   * @returns {Promise} {totalIssued, totalReturned, pendingReturn, damagedItems}
   */
  async getGuardReturnSummary(guardId) {
    try {
      const response = await userRequest.get(`${API_BASE}/guard/${guardId}/summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching return summary:', error);
      throw error;
    }
  }
};

export default returnService;
