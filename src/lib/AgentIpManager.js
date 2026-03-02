/**
 * Agent IP Manager Utility
 * Handles storing and retrieving user's fingerprint agent IP configuration from localStorage
 * IP-only configuration (no agent ID helpers)
 */

const AGENT_IP_STORAGE_KEY = 'fingerprint_agent_ip';

/**
 * Get stored agent IP from localStorage
 * @returns {string|null} Stored agent IP or null if not set
 */
export const getStoredAgentIp = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AGENT_IP_STORAGE_KEY);
};

/**
 * Save agent IP to localStorage
 * @param {string} ip - Agent IP address (e.g., "192.168.1.50" or "192.168.1.50:8765")
 */
export const saveAgentIp = (ip) => {
  if (typeof window === 'undefined') return;
  if (ip && ip.trim()) {
    localStorage.setItem(AGENT_IP_STORAGE_KEY, ip.trim());
  }
};

/**
 * Clear stored agent IP from localStorage
 */
export const clearAgentIp = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AGENT_IP_STORAGE_KEY);
};

/**
 * Check if agent IP is configured
 * @returns {boolean} True if agent IP is configured
 */
export const hasConfiguredAgentIp = () => {
  return !!getStoredAgentIp();
};

/**
 * Validate agent IP format
 * Supports: xxx.xxx.xxx.xxx or xxx.xxx.xxx.xxx:port
 * @param {string} ip - IP address to validate
 * @returns {boolean} True if valid IP format
 */
export const isValidIp = (ip) => {
  if (!ip) return false;
  
  // Regex for IP with optional port
  // Matches: xxx.xxx.xxx.xxx or xxx.xxx.xxx.xxx:port (port 1-65535)
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?::[0-9]{1,5})?$/;
  
  if (!ipRegex.test(ip)) return false;
  
  // If port is specified, validate it's in valid range
  if (ip.includes(':')) {
    const parts = ip.split(':');
    const port = parseInt(parts[1], 10);
    return port > 0 && port <= 65535;
  }
  
  return true;
};

/**
 * Test connection to agent at specified IP via backend proxy
 * @param {string} ip - Agent IP address to test
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const validateAgentConnection = async (ip) => {
  if (!ip || !isValidIp(ip)) {
    return { success: false, message: 'Invalid IP address format' };
  }

  try {
    // Import axios dynamically to avoid circular dependencies
    const { userRequest } = await import('@/lib/RequestMethods');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // Use backend proxy endpoint with X-Agent-Ip header
    // This avoids CORS issues when connecting directly to agent
    const response = await userRequest.get('/biometric/agent-health', {
      headers: {
        'X-Agent-Ip': ip
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // Response structure: { status: 'success', data: { status: 'healthy', device: {...} } }
    const agentStatus = response.data?.data;
    
    if (agentStatus?.status === 'healthy' && agentStatus?.device?.isConnected === true) {
      return { success: true, message: 'Agent is healthy and connected' };
    }

    return { success: false, message: `Agent status: ${agentStatus?.status || 'unknown'}` };
  } catch (error) {
    if (error.name === 'AbortError') {
      return { success: false, message: 'Connection timeout - agent not reachable' };
    }
    
    // More specific error handling
    if (error.response?.status === 503) {
      return { success: false, message: 'Agent service unavailable - ensure agent is running on this IP' };
    }
    
    if (error.code === 'ECONNREFUSED') {
      return { success: false, message: 'Connection refused - agent not running on this IP' };
    }
    
    return { success: false, message: `Connection failed: ${error.message}` };
  }
};
