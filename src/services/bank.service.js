import { userRequest } from '@/lib/RequestMethods';

const API_BASE = '/api/v1/banks';

const bankService = {
  /**
   * Create a new bank
   * @param {object} payload
   * @param {string} payload.bankName
   * @param {string} payload.bankCode
   * @param {boolean} payload.isActive
   */
  async createBank(payload) {
    try {
      const response = await userRequest.post(API_BASE, payload);
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error creating bank:', error);
      throw error;
    }
  },

  /**
   * Fetch banks
   * @param {object} params
   */
  async fetchBanks(params) {
    try {
      const response = await userRequest.get(API_BASE, { params });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error fetching banks:', error);
      throw error;
    }
  },
};

export default bankService;
