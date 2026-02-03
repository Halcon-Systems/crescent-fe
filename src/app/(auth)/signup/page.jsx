"use client";

import React, { useState } from 'react';

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
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center p-2">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 pt-6 ">
                    <div className="rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-center px-6 py-5 shadow-md">
                        <h1 className="text-[17px] text-xl  text-white mb-1">
                            Sign In
                        </h1>
                        <p className="text-[13px] text-sm text-white">
                            Please enter your authorized credentials
                        </p>
                    </div>
                </div>

                {/* ⚪ FORM */}
                <div className="p-8 pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Username */}
                        <div>
                            {/* <label className="block text-pink-700 font-medium mb-2">
              Username
            </label> */}
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition ${errors.username
                                    ? "border-black-500 bg-pink-50"
                                    : "border-black-200 hover:border-black-300"
                                    }`}
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-black-600">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            {/* <label className="block text-pink-700 font-medium mb-2">
              Current password
            </label> */}
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Current password"
                                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition ${errors.password
                                    ? "border-black-500 bg-black-50"
                                    : "border-black-200 hover:border-black-300"
                                    }`}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-black-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        rememberMe: !prev.rememberMe
                                    }))
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${formData.rememberMe ? "bg-black" : "bg-white border"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${formData.rememberMe ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>

                            <label
                                htmlFor="rememberMe"
                                className=" text-[14px] text-sm text-gray-700 cursor-pointer select-none"
                            >
                                Remember me
                            </label>
                        </div>



                        {/* Button */}
                        <button
                            type="submit"
                            className="text-[14px] w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white  py-3 rounded-xl hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition shadow-md"
                        >
                            SIGN IN
                        </button>

                        {/* Signup */}
                        <div className="text-center pt-4 border-t border-black-100 ">
                            <p className="text-sm text-black-700 text-[15px]">
                                Don't have an account?{" "}
                                <span className=" text-[15px] font-semibold text-pink-600 hover:text-black cursor-pointer">
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