import { store } from "@/redux/store";
import { signOut } from "@/redux/slices/userSlice";
import axios from "axios";
import { getStoredAgentIp } from "@/lib/AgentIpManager";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Get token from Redux state
const getTokenFromState = () => {
    const state = store.getState();
    // First try the new token location
    const token = state.user.token;
    if (token) return token;
    
    // Fallback to the old location if needed
    return state.user.currentUser?.data?.token;
};

// Helper to check if endpoint is biometric-related
const isBiometricEndpoint = (url) => {
    return url && url.includes('/biometric/');
};

// Helper to log Redux auth state
const logReduxAuthState = () => {
    const state = store.getState();
    console.log('[RequestMethods] Redux auth state:', {
        hasToken: !!state.user.token,
        hasCurrentUser: !!state.user.currentUser,
        tokenPreview: state.user.token ? state.user.token.substring(0, 20) + '...' : 'none'
    });
};

// Request interceptor - Add token to headers
userRequest.interceptors.request.use(
    (config) => {
        const token = getTokenFromState();
        
        console.log('[RequestMethods] Request to:', config.url);
        console.log('[RequestMethods] Has token:', !!token);
        if (token) {
            console.log('[RequestMethods] Token preview:', token.substring(0, 20) + '...');
        }
        
        // Handle biometric requests
        if (isBiometricEndpoint(config.url)) {
            console.log('[RequestMethods] Biometric request detected');
            console.log('[RequestMethods] Request body:', config.data, 'Type:', typeof config.data);
            console.log('[RequestMethods] Field types:', {
                deviceIndex: typeof config.data?.deviceIndex,
                maxRetries: typeof config.data?.maxRetries,
                timeout: typeof config.data?.timeout,
            });
            if (typeof config.data === 'string') {
                console.warn('[RequestMethods] WARNING: Body is stringified - possible double-serialization');
            }
            logReduxAuthState();
            
            // Note: Agent IP is no longer needed in header
            // Backend now fetches agent IP from database using user's current office
            console.log('[RequestMethods] Backend will fetch agent IP from database');
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - Handle auth errors
userRequest.interceptors.response.use(
    (response) => {
        // Log biometric responses for debugging
        if (isBiometricEndpoint(response.config?.url)) {
            console.log('[RequestMethods] Biometric response:', response.status, response.data);
        }
        return response;
    },
    (error) => {
        // Safe error logging without sensitive data
        const safeErrorDetails = {
            status: error.response?.status,
            endpoint: error.config?.url?.split('?')[0], // Remove query params
            errorType: error.response?.data?.error || 'Unknown Error'
        };
        
        console.error('[RequestMethods] Request failed:', safeErrorDetails);
        if (isBiometricEndpoint(error.config?.url)) {
            console.error('[RequestMethods] Biometric request failed - this may indicate agent connectivity issues');
        }

        // Handle specific error cases
        switch (error.response?.status) {
            case 401:
                console.error('Authentication failed:', safeErrorDetails);
                store.dispatch(signOut());
                window.location.href = '/login';
                break;
            case 403:
                console.error('Permission denied:', safeErrorDetails);
                // Use your toast notification system here
                if (typeof window !== 'undefined' && window.toast) {
                    window.toast.error('Access denied');
                }
                // Only redirect if not on a public page
                if (!window.location.pathname.startsWith('/login')) {
                    window.location.href = '/client-dashboard';
                }
                break;
            case 500:
                console.error('Server error:', safeErrorDetails);
                if (typeof window !== 'undefined' && window.toast) {
                    window.toast.error('An unexpected error occurred');
                }
                break;
            case 503:
                // Biometric-specific handling for service unavailable
                if (isBiometricEndpoint(error.config?.url)) {
                    console.error('Biometric agent service unavailable:', safeErrorDetails);
                    // Don't redirect or show generic toast - let component handle it
                } else {
                    console.error('Service unavailable:', safeErrorDetails);
                    if (typeof window !== 'undefined' && window.toast) {
                        window.toast.error('Service temporarily unavailable. Please try again later.');
                    }
                }
                break;
            default:
                console.error('Request failed:', safeErrorDetails);
                if (typeof window !== 'undefined' && window.toast) {
                    window.toast.error('Request failed');
                }
        }

        // Development-only logging (non-sensitive)
        if (process.env.NODE_ENV === 'development') {
            console.debug('Development error context:', {
                endpoint: safeErrorDetails.endpoint,
                status: safeErrorDetails.status,
                message: error.response?.data?.message || 'No error message provided'
            });
        }

        return Promise.reject(error);
    }
);