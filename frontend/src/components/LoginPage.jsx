// src/components/LoginPage.jsx
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value });
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Simple validation - replace with actual API call
        if (loginData.username === 'demo@kmrl.com' && loginData.password === 'admin123') {
            login('admin');
            navigate('/dashboard');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50/70"> 
            <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-2xl border border-gray-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-xl shadow-lg mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        KMRL InsightVault
                    </h1>
                    <p className="text-gray-600">Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Employee ID / Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={loginData.username}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors"
                                placeholder="Enter your Employee ID or Email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <a href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                Forgot Password?
                            </a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={loginData.password}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-700 text-white rounded-xl hover:bg-indigo-800 transition-all shadow-md hover:shadow-lg font-medium flex items-center justify-center text-lg"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p className="mb-2">
                        New employee? 
                        <a href="/request-access" className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1 transition-colors">
                            Request Access
                        </a>
                    </p>
                    
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200 text-xs">
                        <p className="font-medium text-gray-700 mb-1">
                            **Demo Login Credentials:**
                        </p>
                        <p>ID: <span className="font-mono text-gray-900 font-semibold">demo@kmrl.com</span> | Pass: <span className="font-mono text-gray-900 font-semibold">admin123</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;