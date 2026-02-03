"use client";

import React, { useState } from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

const SignInForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false
    });

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Here you would typically make an API call
            console.log('Form submitted:', formData);
            alert('Sign in successful! (This is a demo)');

            // Reset form after successful submission (demo)
            setFormData({
                username: '',
                password: '',
                rememberMe: false
            });
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

                        <div>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E93B77]/30 transition ${errors.username
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200 hover:border-gray-300"
                                    }`}
                            />
                            {errors.username && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Current password"
                                className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E93B77]/30 transition ${errors.password
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200 hover:border-gray-300"
                                    }`}
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
                                    className="sr-only"
                                />
                                <div className={`block w-10 h-5 rounded-full cursor-pointer transition-all duration-200 ${formData.rememberMe 
                                    ? 'bg-gradient-to-r from-[#E93B77] to-[#DA1F63]' 
                                    : 'bg-gray-300'
                                }`}>
                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${formData.rememberMe 
                                        ? 'translate-x-5 left-0.5' 
                                        : 'translate-x-0 left-0.5'
                                    }`}></div>
                                </div>
                            </div>
                            
                            <label
                                htmlFor="rememberMeToggle"
                                className="text-xs sm:text-sm text-gray-700 cursor-pointer select-none"
                            >
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#E93B77] to-[#DA1F63] text-white text-xs sm:text-sm font-medium py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:from-[#DA1F63] hover:to-[#E93B77] focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-[#DC22655C] transition-all duration-300 shadow-sm sm:shadow-md hover:shadow-md sm:hover:shadow-lg"
                        >
                            SIGN IN
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