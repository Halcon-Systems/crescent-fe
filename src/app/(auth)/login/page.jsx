"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/slices/userSlice';
import { publicRequest } from '@/lib/RequestMethods';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

// Yup validation schema
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Your email is invalid.')
        .required('Email is required'),
    password: yup
        .string()
        .min(4, 'Password must be at least 4 characters.')
        .required('Password is required')
});

const SignInForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const validateField = async (name, value) => {
        try {
            await yup.reach(loginSchema, name).validate(value);
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
            return true;
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                [name]: error.message
            }));
            return false;
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Clear API error when user modifies input
        if (apiError) {
            setApiError('');
        }

        // Validate field on change
        if (name === 'email' || name === 'password') {
            validateField(name, value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setApiError('');

        // First validate the form with Yup
        try {
            await loginSchema.validate(formData, { abortEarly: false });
            setErrors({});
        } catch (validationError) {
            const validationErrors = {};
            if (validationError.inner) {
                validationError.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
            }
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        // Make API call
        try {
            const res = await publicRequest.post('/auth/login', formData, { 
                headers: { 'Content-Type': 'application/json' } 
            });

            // Validate response structure
            if (res.data && res.data.data && res.data.data.token) {
                // Store token
                localStorage.setItem("token", res.data.data.token);

                // Get user data from the response
                const userData = res.data.data.user;
                console.log('Full user data:', userData);

                localStorage.setItem("user", JSON.stringify(userData));
                
                // Store features and sub-features
                if (userData.features) {
                    localStorage.setItem("features", JSON.stringify(userData.features));
                }
                if (userData.subFeatures) {
                    localStorage.setItem("subFeatures", JSON.stringify(userData.subFeatures));
                }
                
                // Transform the response to match the expected state structure
                const loginData = {
                    user: res.data.data.user,
                    token: res.data.data.token
                };
                dispatch(loginSuccess(loginData));

                // Set session persistence based on checkbox
                if (formData.rememberMe) {
                    localStorage.setItem("keepSignedIn", "true");
                }

                // Check user role and determine redirect
                const userRole = userData?.roleName;
                const isSuperAdminFlag = userData?.isSuperAdmin;
                
                console.log('Login - User data:', {
                    roleName: userRole,
                    isSuperAdminFlag: isSuperAdminFlag,
                });

                // Determine redirect path based on role
                let redirectPath = '/dashboard'; // default

                // Check if super admin
                if (isSuperAdminFlag === true) {
                    redirectPath = '/dashboard'; // Update based on your routing
                    console.log('User is SuperAdmin, redirecting to:', redirectPath);
                } 
                // Check if client
                else if (userRole === 'CLIENT') {
                    redirectPath = '/dashboard'; // Update based on your routing
                    console.log('User is Client, redirecting to:', redirectPath);
                } 
                // Default to regular dashboard
                else {
                    console.log('User is regular user, redirecting to:', redirectPath);
                }

                toast.success('Login successful!');
                
                // Perform redirect
                router.push(redirectPath);
            } else {
                // Handle unexpected response structure
                console.error('Unexpected response structure:', res.data);
                setApiError('Login successful but received unexpected response format.');
            }

        } catch (apiError) {
            console.error('Login API error:', apiError);

            let errorMessage = 'An error occurred during login.';

            if (apiError.response) {
                const status = apiError.response.status;
                const data = apiError.response.data;

                switch (status) {
                    case 401:
                        errorMessage = 'Invalid email or password.';
                        break;
                    case 403:
                        errorMessage = 'Account access denied.';
                        break;
                    case 422:
                        errorMessage = 'Invalid input data.';
                        break;
                    case 500:
                        errorMessage = 'Server error. Please try again later.';
                        break;
                    default:
                        if (data && data.message) {
                            errorMessage = data.message;
                        }
                }
            } else if (apiError.request) {
                errorMessage = 'Network error. Please check your connection.';
            }

            setApiError(errorMessage);

            // Show error toast
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center p-3 sm:p-4">
            <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl pt-20 sm:pt-24 md:pt-28">
                <div className="absolute -top-5 sm:-top-6 left-1/2 w-[92%] sm:w-[90%] -translate-x-1/2">
                    <div className="rounded-lg sm:rounded-xl flex flex-col justify-center bg-gradient-to-r from-[#E93B77] via-[#E12A6D] to-[#DA1F63] text-center px-4 py-3 sm:px-6 sm:py-4 shadow-md h-20 sm:h-24 md:h-28">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 sm:mb-1">
                            Sign In
                        </h1>
                        <p className="text-xs sm:text-sm text-white/90">
                            Please enter your authorized credentials
                        </p>
                    </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8 pt-3 sm:pt-4">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                        {/* API Error Display */}
                        {apiError && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{apiError}</p>
                            </div>
                        )}

                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={(e) => validateField(e.target.name, e.target.value)}
                                disabled={isLoading}
                                placeholder="Enter your email"
                                className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E93B77]/30 transition ${errors.email
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200 hover:border-gray-300"
                                    } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={(e) => validateField(e.target.name, e.target.value)}
                                disabled={isLoading}
                                placeholder="Enter your password"
                                className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E93B77]/30 transition ${errors.password
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200 hover:border-gray-300"
                                    } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="relative inline-block w-10 h-5">
                                <input
                                    type="checkbox"
                                    id="rememberMeToggle"
                                    checked={formData.rememberMe}
                                    onChange={(e) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            rememberMe: e.target.checked
                                        }))
                                    }
                                    disabled={isLoading}
                                    className="sr-only"
                                />
                                <div className={`block w-10 h-5 rounded-full cursor-pointer transition-all duration-200 ${formData.rememberMe 
                                    ? 'bg-gradient-to-r from-[#E93B77] to-[#DA1F63]' 
                                    : 'bg-gray-300'
                                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${formData.rememberMe 
                                        ? 'translate-x-5 left-0.5' 
                                        : 'translate-x-0 left-0.5'
                                    }`}></div>
                                </div>
                            </div>
                            
                            <label
                                htmlFor="rememberMeToggle"
                                className={`text-xs sm:text-sm text-gray-700 cursor-pointer select-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-[#E93B77] to-[#DA1F63] text-white text-xs sm:text-sm font-medium py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:from-[#DA1F63] hover:to-[#E93B77] focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-[#DC22655C] transition-all duration-300 shadow-sm sm:shadow-md hover:shadow-md sm:hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                        </button>

                        <div className="text-center pt-3 sm:pt-4 border-t border-gray-100">
                            <p className="text-xs sm:text-sm text-gray-600">
                                Don't have an account?{" "}
                                <span className="font-medium sm:font-semibold text-[#DA1F63] hover:text-[#E93B77] cursor-pointer transition-colors">
                                    Sign Up
                                </span>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
