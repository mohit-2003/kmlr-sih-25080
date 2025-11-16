// src/components/LoginPage.jsx
import React, { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Reusable UI Components
import Input from "./ui/input";
import Button from "./ui/button";
import Card from "./ui/card";
import FormGroup from "./ui/formGroup";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value });
        setError("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // TEMP: Demo login logic (Replace with API)
        if (
            loginData.username === "demo@kmrl.com" &&
            loginData.password === "admin123"
        ) {
            login("admin");
            navigate("/dashboard");
        } else {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            
            <Card className="w-full max-w-md p-10">
                {/* Logo + Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-700 rounded-xl shadow">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mt-4">
                        KMRL InsightVault
                    </h1>
                    <p className="text-gray-600">Sign in to continue</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    
                    {/* Username */}
                    <FormGroup label="Employee ID / Email" htmlFor="username">
                        <Input
                            id="username"
                            type="text"
                            value={loginData.username}
                            onChange={handleChange}
                            placeholder="Enter your Employee ID or Email"
                            icon={User}
                            required
                        />
                    </FormGroup>

                    {/* Password */}
                    <FormGroup label="Password" htmlFor="password"
                        rightLabel="Forgot Password?"
                        rightLabelLink="/forgot-password"
                    >
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={loginData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            icon={Lock}
                            required
                            rightIcon={showPassword ? EyeOff : Eye}
                            onRightIconClick={() => setShowPassword(!showPassword)}
                        />
                    </FormGroup>

                    {/* Error message */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Login Button */}
                    <Button type="submit" className="w-full text-lg">
                        Sign In
                    </Button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        New employee?
                        <a
                            href="/request-access"
                            className="text-indigo-600 font-semibold ml-1"
                        >
                            Request Access
                        </a>
                    </p>

                    {/* Demo login info */}
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200 text-xs">
                        <p className="font-medium text-gray-700">Demo Login:</p>
                        <p>
                            ID: <span className="font-mono font-semibold">demo@kmrl.com</span> |
                            Pass: <span className="font-mono font-semibold">admin123</span>
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
