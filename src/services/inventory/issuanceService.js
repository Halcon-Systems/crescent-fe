import { userRequest } from '@/lib/RequestMethods';

const API_BASE = '/inventory/issuances';

/**
 * Issuance Service - Track items issued to guards/staff (ISSUED → PARTIAL_RETURN / FULL_RETURN)
 */
const issuanceService = {
  /**
   * Fetch all issuances
   * @param {object} options - Pagination and filters {page, limit, status, guardId, storeId}
   * @returns {Promise} {data: [], total: number, page: number}
   */
  async fetchIssuances(options = {}) {
    try {
      const response = await userRequest.get(API_BASE, { params: options });
      return response.data;
    } catch (error) {
      console.error('Error fetching issuances:', error);
      throw error;
    }
  },

  /**
   * Fetch single issuance
   * @param {string} id - Issuance ID
   * @returns {Promise} Issuance data with line items
   */
  async fetchIssuanceById(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching issuance ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new issuance record
   * @param {object} issuanceData - Issuance details {guardId, storeId, items: [{itemId, quantity, serialNumber}], notes}
   * @returns {Promise} Created issuance with status=ISSUED
   */
  async createIssuance(issuanceData) {
    try {
      const response = await userRequest.post(API_BASE, issuanceData);
      return response.data;
    } catch (error) {
      console.error('Error creating issuance:', error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Invalid issuance data');
      }
      throw error;
    }
  },

  /**
   * Update issuance (only in ISSUED status)
   * @param {string} id - Issuance ID
   * @param {object} issuanceData - Updated data
   * @returns {Promise} Updated issuance
   */
  async updateIssuance(id, issuanceData) {
    try {
      const response = await userRequest.patch(`${API_BASE}/${id}`, issuanceData);
      return response.data;
    } catch (error) {
      console.error(`Error updating issuance ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get issuances for a guard
   * @param {string} guardId - Guard ID
   * @returns {Promise} Array of issuances for that guard
   */
  async getGuardIssuances(guardId) {
    try {
      const response = await userRequest.get(`${API_BASE}?guardId=${guardId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching guard issuances:', error);
      throw error;
    }
  },

  /**
   * Get issuance items
   * @param {string} id - Issuance ID
   * @returns {Promise} Array of issued items
   */
  async getIssuanceItems(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}/items`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching issuance items:`, error);
      throw error;
    }
  },

  /**
   * Get active issuances for a guard (not yet fully returned)
   * @param {string} guardId - Guard ID
   * @returns {Promise} Array of active issuances
   */
  async getActiveIssuancesForGuard(guardId) {
    try {
      const response = await userRequest.get(`${API_BASE}/guard/${guardId}/active`);
      return response.data;
    } catch (error) {
      console.error('Error fetching active issuances:', error);
      throw error;
    }
  }
};

export default issuanceService;
