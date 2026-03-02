/**
 * Vendor Service
 * Handles all vendor/supplier related API operations
 */

import { userRequest } from '@/lib/RequestMethods';

const vendorService = {
  /**
   * Fetch all vendors
   * @param {number} page - Page number (optional)
   * @param {number} limit - Items per page (optional)
   * @returns {Promise} - Paginated vendor data
   */
  async fetchVendors(page = 1, limit = 100) {
    try {
      console.log(`[vendorService.fetchVendors] Starting fetch with page=${page}, limit=${limit}`);
      const res = await userRequest.get('/inventory/vendors', {
        params: { page, limit }
      });
      console.log('[vendorService.fetchVendors] Full response:', res);
      
      // Backend returns wrapped response: { status, message, data: { data: [...], total, page, limit, totalPages } }
      const wrappedData = res?.data?.data;
      console.log('[vendorService.fetchVendors] Wrapped data:', wrappedData);
      
      if (wrappedData && typeof wrappedData === 'object') {
        // If wrappedData has a 'data' property, it's the paginated response
        if (Array.isArray(wrappedData.data)) {
          console.log(`[vendorService.fetchVendors] Success: Found ${wrappedData.data.length} vendors`);
          return wrappedData; // Return the full paginated object { data: [...], total, page, limit, totalPages }
        }
        // If wrappedData itself is an array, return it wrapped
        if (Array.isArray(wrappedData)) {
          console.log(`[vendorService.fetchVendors] Success: Found ${wrappedData.length} vendors`);
          return { data: wrappedData, total: wrappedData.length, page, limit, totalPages: 1 };
        }
      }
      
      // Fallback: try to extract from res.data directly
      if (Array.isArray(res?.data)) {
        console.log(`[vendorService.fetchVendors] Fallback: Found ${res.data.length} vendors in res.data`);
        return { data: res.data, total: res.data.length, page, limit, totalPages: 1 };
      }
      
      console.warn('[vendorService.fetchVendors] No vendors found in response');
      return { data: [], total: 0, page, limit, totalPages: 0 };
    } catch (error) {
      console.error('[vendorService.fetchVendors] Error occurred:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method
      });
      throw error;
    }
  },

  /**
   * Create a new vendor/supplier
   * @param {Object} vendorData - Vendor data
   * @returns {Promise} - Created vendor object
   */
  async createVendor(vendorData) {
    try {
      const res = await userRequest.post('/inventory/vendors', vendorData);
      // Handle wrapped response from TransformInterceptor
      // Structure: { status, message, data: vendorObject }
      console.log('[vendorService.createVendor] Response:', res);
      return res?.data?.data || res?.data || res;
    } catch (error) {
      console.error('Error creating vendor:', error);
      throw error;
    }
  },

  /**
   * Update a vendor/supplier
   * @param {string} vendorId - Vendor ID
   * @param {Object} vendorData - Updated vendor data
   * @returns {Promise} - Updated vendor object
   */
  async updateVendor(vendorId, vendorData) {
    try {
      const res = await userRequest.put(`/inventory/vendors/${vendorId}`, vendorData);
      // Handle wrapped response from TransformInterceptor
      console.log('[vendorService.updateVendor] Response:', res);
      return res?.data?.data || res?.data || res;
    } catch (error) {
      console.error('Error updating vendor:', error);
      throw error;
    }
  },

  /**
   * Delete a vendor/supplier
   * @param {string} vendorId - Vendor ID
   * @returns {Promise} - Deletion confirmation
   */
  async deleteVendor(vendorId) {
    try {
      const res = await userRequest.delete(`/inventory/vendors/${vendorId}`);
      // Handle wrapped response from TransformInterceptor
      return res?.data?.data || res?.data || res;
    } catch (error) {
      console.error('Error deleting vendor:', error);
      throw error;
    }
  },

  /**
   * Get a single vendor by ID
   * @param {string} vendorId - Vendor ID
   * @returns {Promise} - Vendor object
   */
  async getVendorById(vendorId) {
    try {
      const res = await userRequest.get(`/inventory/vendors/${vendorId}`);
      // Handle wrapped response from TransformInterceptor
      return res?.data?.data || res?.data || res;
    } catch (error) {
      console.error('Error fetching vendor:', error);
      throw error;
    }
  }
};

export default vendorService;
