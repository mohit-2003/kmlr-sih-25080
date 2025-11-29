// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/button";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-800 font-bold mr-3">
          🚉
        </div>
        <h2 className="m-0 text-xl font-bold font-inter">
          KMRL InsightVault
        </h2>
      </div>
      
      <div className="flex gap-6 items-center">
        {!role ? (
          // Show when not logged in
          <>
            <Link
              to="/"
              className={`no-underline font-medium transition-colors py-2 px-4 rounded-lg ${
                isActive("/")
                  ? "bg-white text-blue-800 font-semibold"
                  : "text-white hover:bg-blue-700"
              }`}
            >
              Home
            </Link>
            <Link
              to="/login"
              className={`no-underline font-medium transition-colors py-2 px-4 rounded-lg ${
                isActive("/login")
                  ? "bg-white text-blue-800 font-semibold"
                  : "text-white hover:bg-blue-700"
              }`}
            >
              Login
            </Link>
          </>
        ) : (
          // Show when logged in
          <>
            <Link
              to="/dashboard"
              className={`no-underline font-medium transition-colors py-2 px-4 rounded-lg ${
                isActive("/dashboard")
                  ? "bg-white text-blue-800 font-semibold"
                  : "text-white hover:bg-blue-700"
              }`}
            >
              Dashboard
            </Link>
            <Button
              onClick={handleLogout}
              className="no-underline font-medium transition-colors py-2 px-4 rounded-lg text-white hover:bg-blue-700 border border-white/30"
            >
              Logout
            </Button>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              {role}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;