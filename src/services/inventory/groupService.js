/**
 * Group Service
 * Handles all group/section related API operations
 */

import { userRequest } from '@/lib/RequestMethods';

const groupService = {
  /**
   * Fetch all groups/sections
   * @returns {Promise} - Array of groups
   */
  async fetchGroups() {
    try {
      const res = await userRequest.get('/inventory/groups');
      return res?.data?.data || [];
    } catch (error) {
      console.error('Error fetching groups:', error);
      throw error;
    }
  },

  /**
   * Create a new group/section
   * @param {Object} groupData - Group data { name: string }
   * @returns {Promise} - Created group object
   */
  async createGroup(groupData) {
    try {
      const res = await userRequest.post('/inventory/groups', groupData);
      // Handle wrapped response from TransformInterceptor
      console.log('[groupService.createGroup] Response:', res);
      return res?.data?.data || res?.data || res;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  },

  /**
   * Update a group/section
   * @param {string} groupId - Group ID
   * @param {Object} groupData - Updated group data
   * @returns {Promise} - Updated group object
   */
  async updateGroup(groupId, groupData) {
    try {
      const res = await userRequest.put(`/inventory/groups/${groupId}`, groupData);
      // Handle wrapped response from TransformInterceptor
      return res?.data?.data || res?.data || res;
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  },

  /**
   * Delete a group/section
   * @param {string} groupId - Group ID
   * @returns {Promise} - Deletion confirmation
   */
  async deleteGroup(groupId) {
    try {
      const res = await userRequest.delete(`/inventory/groups/${groupId}`);
      // Handle wrapped response from TransformInterceptor
      return res?.data?.data || res?.data || res;
    } catch (error) {
      console.error('Error deleting group:', error);
      throw error;
    }
  },

  /**
   * Get a single group by ID
   * @param {string} groupId - Group ID
   * @returns {Promise} - Group object
   */
  async getGroupById(groupId) {
    try {
      const res = await userRequest.get(`/inventory/groups/${groupId}`);
      // Handle wrapped response from TransformInterceptor
      return res?.data?.data || res?.data || res;
    } catch (error) {
      console.error('Error fetching group:', error);
      throw error;
    }
  }
};

export default groupService;
