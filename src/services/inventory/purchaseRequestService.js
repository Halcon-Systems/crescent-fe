import { userRequest } from '@/lib/RequestMethods';

const API_BASE = '/inventory/purchase-requests';

/**
 * Purchase Request Service - Manage PR workflow (DRAFT → SUBMITTED → APPROVED)
 */
const purchaseRequestService = {
  /**
   * Fetch all purchase requests
   * @param {object} options - Pagination and filters {page, limit, status}
   * @returns {Promise} {data: [], total: number, page: number, totalPages: number}
   */
  async fetchPurchaseRequests(options = {}) {
    try {
      const response = await userRequest.get(API_BASE, { params: options });
      // Backend returns PaginatedResponse wrapped by TransformInterceptor
      const paginatedData = response.data?.data;
      if (!paginatedData) return { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
      return paginatedData;
    } catch (error) {
      console.error('Error fetching purchase requests:', error);
      throw error;
    }
  },

  /**
   * Fetch single PR
   * @param {string} id - PR ID
   * @returns {Promise} PR data with line items
   */
  async fetchPurchaseRequestById(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching PR ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new PR
   * @param {object} prData - PR details with office, userId, dateTime, requiredDate, items, storeId
   * @returns {Promise} Created PR with unique prNumber
   */
  async createPurchaseRequest(prData) {
    try {
      // Transform frontend data to backend format
      // Backend will auto-fill officeId if not provided, based on user context
      const backendData = {
        storeId: prData.storeId, // Include storeId (required)
        officeId: prData.officeId,
        requiredDate: prData.requiredDate,
        items: prData.items.map(item => ({
          itemId: item.itemId,
          quantity: item.quantity,
          unitOfMeasurement: item.unitOfMeasurement
        }))
      };
      
      console.log('[PurchaseRequestService] Transformed data:', backendData);
      const response = await userRequest.post(API_BASE, backendData);
      return response.data;
    } catch (error) {
      console.error('Error creating PR:', error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Invalid PR data');
      }
      throw error;
    }
  },

  /**
   * Update PR (only in DRAFT status)
   * @param {string} id - PR ID
   * @param {object} prData - Updated PR data
   * @returns {Promise} Updated PR
   */
  async updatePurchaseRequest(id, prData) {
    try {
      const response = await userRequest.patch(`${API_BASE}/${id}`, prData);
      return response.data;
    } catch (error) {
      console.error(`Error updating PR ${id}:`, error);
      if (error.response?.status === 400) {
        throw new Error('Can only update PRs in DRAFT status');
      }
      throw error;
    }
  },

  /**
   * Submit PR for approval (DRAFT → SUBMITTED)
   * @param {string} id - PR ID
   * @returns {Promise} Updated PR with status=SUBMITTED
   */
  async submitPurchaseRequest(id) {
    try {
      const response = await userRequest.post(`${API_BASE}/${id}/submit`);
      return response.data;
    } catch (error) {
      console.error(`Error submitting PR ${id}:`, error);
      throw error;
    }
  },

  /**
   * Approve PR (SUBMITTED → APPROVED)
   * @param {string} id - PR ID
   * @returns {Promise} Updated PR with status=APPROVED
   */
  async approvePurchaseRequest(id) {
    try {
      const response = await userRequest.post(`${API_BASE}/${id}/approve`);
      return response.data;
    } catch (error) {
      console.error(`Error approving PR ${id}:`, error);
      throw error;
    }
  },

  /**
   * Reject PR (SUBMITTED → REJECTED)
   * @param {string} id - PR ID
   * @param {object} data - Rejection reason {reason}
   * @returns {Promise} Updated PR with status=REJECTED
   */
  async rejectPurchaseRequest(id, data) {
    try {
      const response = await userRequest.post(`${API_BASE}/${id}/reject`, data);
      return response.data;
    } catch (error) {
      console.error(`Error rejecting PR ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete PR (DRAFT only)
   * @param {string} id - PR ID
   * @returns {Promise} Deletion confirmation
   */
  async deletePurchaseRequest(id) {
    try {
      const response = await userRequest.delete(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting PR ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get PR line items
   * @param {string} id - PR ID
   * @returns {Promise} Array of line items
   */
  async getPurchaseRequestItems(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}/items`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching PR items:`, error);
      throw error;
    }
  },

  /**
   * Get stores by office ID
   * @param {string} officeId - Office ID
   * @returns {Promise} Array of stores for that office
   */
  async getStoresByOffice(officeId) {
    try {
      const response = await userRequest.get(`${API_BASE}/stores/by-office/${officeId}`);
      // Handle both direct response and wrapped response
      const data = response.data?.data || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`Error fetching stores for office ${officeId}:`, error);
      throw error;
    }
  }
};

export default purchaseRequestService;
