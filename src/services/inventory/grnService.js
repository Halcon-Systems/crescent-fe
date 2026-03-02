import { userRequest } from '@/lib/RequestMethods';

const API_BASE = '/inventory/grn';

/**
 * GRN Service - Goods Receipt Notes with 7-step atomic transaction
 * 
 * CRITICAL: GRN implements atomic transaction:
 * 1. Verify PO items match receipt
 * 2. Quality inspection
 * 3. Accept/reject items
 * 4. Update PO line item quantityReceived
 * 5. Update inventory stock levels
 * 6. Record stock movements (audit trail)
 * 7. Update purchase order status based on fulfillment
 */
const grnService = {
  /**
   * Fetch all GRNs
   * @param {object} options - Pagination and filters {page, limit, status, storeId}
   * @returns {Promise} {data: [], total: number, page: number}
   */
  async fetchGrns(options = {}) {
    try {
      const response = await userRequest.get(API_BASE, { params: options });
      return response.data;
    } catch (error) {
      console.error('Error fetching GRNs:', error);
      throw error;
    }
  },

  /**
   * Fetch single GRN
   * @param {string} id - GRN ID
   * @returns {Promise} GRN data with line items
   */
  async fetchGrnById(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching GRN ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new GRN for purchase order
   * @param {object} grnData - GRN details {poId, storeId, vendorId, receivedDate, items: [], notes}
   * @returns {Promise} Created GRN with status=PENDING
   */
  async createGrn(grnData) {
    try {
      const response = await userRequest.post(API_BASE, grnData);
      return response.data;
    } catch (error) {
      console.error('Error creating GRN:', error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Invalid GRN data');
      }
      throw error;
    }
  },

  /**
   * Update GRN (only in PENDING status)
   * @param {string} id - GRN ID
   * @param {object} grnData - Updated GRN data
   * @returns {Promise} Updated GRN
   */
  async updateGrn(id, grnData) {
    try {
      console.log('[grnService.updateGrn] Updating GRN ID:', id);
      console.log('[grnService.updateGrn] Payload:', JSON.stringify(grnData, null, 2));
      
      const response = await userRequest.put(`${API_BASE}/${id}`, grnData);
      console.log('[grnService.updateGrn] Success response:', response);
      return response.data;
    } catch (error) {
      console.error(`[grnService.updateGrn] Error updating GRN ${id}:`, error.message);
      console.error('[grnService.updateGrn] Full error object:', error);
      console.error('[grnService.updateGrn] Error response status:', error.response?.status);
      console.error('[grnService.updateGrn] Error response data:', error.response?.data);
      
      // Extract validation errors if available
      if (error.response?.data?.message) {
        const errorMsg = Array.isArray(error.response.data.message) 
          ? error.response.data.message.join(', ') 
          : error.response.data.message;
        console.error('[grnService.updateGrn] Validation errors:', errorMsg);
        throw new Error(errorMsg);
      }
      
      throw error;
    }
  },

  /**
   * Delete GRN (only in PENDING status)
   * @param {string} id - GRN ID
   * @returns {Promise} Confirmation message
   */
  async deleteGrn(id) {
    try {
      const response = await userRequest.delete(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting GRN ${id}:`, error);
      if (error.response?.status === 409) {
        throw new Error('Cannot delete GRN that is not in PENDING status');
      }
      throw error;
    }
  },

  /**
   * CRITICAL: Receive GRN - Executes the 7-step atomic transaction
   * 
   * Transaction steps:
   * 1. Validate GRN items match PO items
   * 2. Perform quality inspection (accept/reject quantities)
   * 3. Update PO line item quantityReceived
   * 4. Update inventory stock (quantityOnHand += accepted, quantityReserved -= ordered)
   * 5. Record stock movements for audit trail
   * 6. Update PO status (RECEIVED if complete, PARTIALLY_RECEIVED if partial)
   * 7. Set GRN status to RECEIVED
   * 
   * All steps must succeed or entire transaction rolls back.
   * 
   * @param {string} id - GRN ID
   * @param {object} data - Inspection results {items: [{itemId, quantityAccepted, quantityRejected, conditionStatus}]}
   * @returns {Promise} Received GRN with updated inventory and PO
   * @throws {Error} If any step fails (transaction will rollback)
   */
  async receiveGrn(id, data) {
    try {
      const response = await userRequest.post(`${API_BASE}/${id}/receive`, data);
      return response.data;
    } catch (error) {
      console.error(`Error receiving GRN ${id}:`, error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Invalid receipt data');
      }
      if (error.response?.status === 409) {
        throw new Error('GRN already processed or PO not confirmed');
      }
      throw error;
    }
  },

  /**
   * Start QA inspection (PENDING → INSPECTING)
   * @param {string} id - GRN ID
   * @returns {Promise} Updated GRN
   */
  async startInspection(id) {
    try {
      const response = await userRequest.post(`${API_BASE}/${id}/inspect`);
      return response.data;
    } catch (error) {
      console.error(`Error starting inspection for GRN ${id}:`, error);
      throw error;
    }
  },

  /**
   * Reject GRN (INSPECTING → REJECTED)
   * @param {string} id - GRN ID
   * @param {object} data - Rejection reason {reason}
   * @returns {Promise} Updated GRN
   */
  async rejectGrn(id, data) {
    try {
      const response = await userRequest.post(`${API_BASE}/${id}/reject`, data);
      return response.data;
    } catch (error) {
      console.error(`Error rejecting GRN ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get GRN line items
   * @param {string} id - GRN ID
   * @returns {Promise} Array of line items with QA status
   */
  async getGrnItems(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}/items`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching GRN items:`, error);
      throw error;
    }
  },

  /**
   * Get GRNs for a specific PO
   * @param {string} poId - Purchase Order ID
   * @returns {Promise} Array of GRNs for that PO
   */
  async getGrnsByPO(poId) {
    try {
      const response = await userRequest.get(`${API_BASE}?poId=${poId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching GRNs for PO:`, error);
      throw error;
    }
  },

  /**
   * Generate GRN report/receipt
   * @param {string} id - GRN ID
   * @returns {Promise} PDF or document URL
   */
  async generateGrnReport(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}/report`);
      return response.data;
    } catch (error) {
      console.error(`Error generating GRN report:`, error);
      throw error;
    }
  }
};

export default grnService;
