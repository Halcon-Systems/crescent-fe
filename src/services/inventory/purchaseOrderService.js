import { userRequest } from '@/lib/RequestMethods';

const API_BASE = '/inventory/purchase-orders';

/**
 * Purchase Order Service - Manage PO workflow
 * Handles creation, retrieval, updates, and status management of purchase orders
 */
const purchaseOrderService = {
  /**
   * Fetch all purchase orders with pagination and filters
   * @param {object} options - Pagination and filters {page, limit, status, paymentStatus, prId}
   * @returns {Promise} {data: [], total: number, page: number, totalPages: number}
   */
  async fetchPurchaseOrders(options = {}) {
    try {
      const response = await userRequest.get(API_BASE, { params: options });
      // Backend returns PaginatedResponse wrapped by TransformInterceptor
      const paginatedData = response.data?.data;
      if (!paginatedData) return { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
      return paginatedData;
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
      throw error;
    }
  },

  /**
   * Fetch single PO by ID
   * @param {string} id - Purchase Order ID
   * @returns {Promise} PO data with items and creator details
   */
  async fetchPurchaseOrderById(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching PO ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new purchase order
   * @param {object} poData - PO details {officeId, items, expectedDeliveryDate, taxAmount, shippingCost, discountAmount, notes}
   * @returns {Promise} Created PO with unique poNumber
   */
  async createPurchaseOrder(poData) {
    try {
      // Pass data as-is - it's already in the format the backend expects
      // Backend expects:
      // - officeId (optional): UUID of the office
      // - items: array of {itemId: UUID, quantityOrdered: number, unitPrice: decimal string, totalPrice: decimal string}
      // - expectedDeliveryDate (optional): ISO date string
      // - taxAmount (optional): decimal string
      // - shippingCost (optional): decimal string
      // - discountAmount (optional): decimal string
      // - notes (optional): string

      const backendData = {
        ...(poData.officeId && { officeId: poData.officeId }),
        items: poData.items,
        ...(poData.expectedDeliveryDate && { expectedDeliveryDate: poData.expectedDeliveryDate }),
        ...(poData.taxAmount && { taxAmount: poData.taxAmount }),
        ...(poData.shippingCost && { shippingCost: poData.shippingCost }),
        ...(poData.discountAmount && { discountAmount: poData.discountAmount }),
        ...(poData.notes && { notes: poData.notes })
      };

      console.log('[PurchaseOrderService] Creating PO:', JSON.stringify(backendData, null, 2));
      const response = await userRequest.post(API_BASE, backendData);
      return response.data;
    } catch (error) {
      console.error('Error creating PO:', error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Invalid PO data');
      }
      throw error;
    }
  },

  /**
   * Update purchase order
   * @param {string} id - PO ID
   * @param {object} poData - Updated PO data
   * @returns {Promise} Updated PO
   */
  async updatePurchaseOrder(id, poData) {
    try {
      const response = await userRequest.put(`${API_BASE}/${id}`, poData);
      return response.data;
    } catch (error) {
      console.error(`Error updating PO ${id}:`, error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Unable to update PO');
      }
      throw error;
    }
  },

  /**
   * Submit purchase order for approval
   * @param {string} id - PO ID
   * @returns {Promise} Updated PO with status=SUBMITTED
   */
  async submitPurchaseOrder(id) {
    try {
      const response = await userRequest.post(`${API_BASE}/${id}/submit`);
      return response.data;
    } catch (error) {
      console.error(`Error submitting PO ${id}:`, error);
      throw error;
    }
  },

  /**
   * Update purchase order status
   * @param {string} id - PO ID
   * @param {string} status - New status (DRAFT, SUBMITTED, APPROVED, REJECTED, CANCELLED)
   * @returns {Promise} Updated PO with new status
   */
  async updatePurchaseOrderStatus(id, status) {
    try {
      const response = await userRequest.post(`${API_BASE}/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating PO ${id} status:`, error);
      throw error;
    }
  },

  /**
   * Update purchase order payment status
   * @param {string} id - PO ID
   * @param {string} paymentStatus - New payment status (PENDING, PAID, PARTIALLY_PAID, OVERDUE)
   * @returns {Promise} Updated PO with new payment status
   */
  async updatePurchaseOrderPaymentStatus(id, paymentStatus) {
    try {
      const response = await userRequest.post(`${API_BASE}/${id}/payment-status`, { paymentStatus });
      return response.data;
    } catch (error) {
      console.error(`Error updating PO ${id} payment status:`, error);
      throw error;
    }
  },

  /**
   * Create purchase order from approved purchase request
   * @param {string} prId - Purchase Request ID
   * @param {object} convertData - PO conversion data {amounts, poDate, requiredDate, expectedDeliveryDate, notes}
   * @returns {Promise} Created PO
   */
  async createFromPurchaseRequest(prId, convertData) {
    try {
      const backendData = {
        amounts: convertData.amounts || {},
        poDate: convertData.poDate,
        requiredDate: convertData.requiredDate,
        expectedDeliveryDate: convertData.expectedDeliveryDate,
        notes: convertData.notes || ''
      };

      console.log('[PurchaseOrderService] Creating PO from PR:', backendData);
      const response = await userRequest.post(`${API_BASE}/from-pr/${prId}`, backendData);
      return response.data;
    } catch (error) {
      console.error(`Error creating PO from PR ${prId}:`, error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Unable to create PO from purchase request');
      }
      throw error;
    }
  },

  /**
   * Delete purchase order
   * @param {string} id - PO ID
   * @returns {Promise} Deletion confirmation
   */
  async deletePurchaseOrder(id) {
    try {
      const response = await userRequest.delete(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting PO ${id}:`, error);
      throw error;
    }
  }
};

export default purchaseOrderService;
