import { userRequest } from '@/lib/RequestMethods';

const API_BASE = '/organizations';

/**
 * Office Service - Manage organization offices
 */
const officeService = {
  /**
   * Fetch all offices by organization
   * @returns {Promise} List of offices for the organization
   */
  async fetchOfficesByOrganization() {
    try {
      const response = await userRequest.get(`${API_BASE}/get-offices`);
      console.log('Offices response:', response);
      
      // Handle different response formats
      // The API returns: {data: {status: 'success', message: '...', data: Array(2)}}
      if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data?.success && response.data?.data) {
        return Array.isArray(response.data.data) ? response.data.data : [];
      }
      
      console.warn('Unexpected office response format:', response.data);
      return [];
    } catch (error) {
      console.error('Error fetching offices:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  },

  /**
   * Fetch single office
   * @param {string} id - Office ID
   * @returns {Promise} Office data
   */
  async fetchOfficeById(id) {
    try {
      const response = await userRequest.get(`${API_BASE}/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error(`Error fetching office ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new office
   * @param {object} officeData - Office details
   * @returns {Promise} Created office
   */
  async createOffice(officeData) {
    try {
      const response = await userRequest.post(API_BASE, officeData);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating office:', error);
      throw error;
    }
  },

  /**
   * Update office
   * @param {string} id - Office ID
   * @param {object} officeData - Updated office data
   * @returns {Promise} Updated office
   */
  async updateOffice(id, officeData) {
    try {
      const response = await userRequest.patch(`${API_BASE}/${id}`, officeData);
      return response.data.data || response.data;
    } catch (error) {
      console.error(`Error updating office ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete office
   * @param {string} id - Office ID
   * @returns {Promise} Deletion confirmation
   */
  async deleteOffice(id) {
    try {
      const response = await userRequest.delete(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting office ${id}:`, error);
      throw error;
    }
  }
};

export default officeService;
