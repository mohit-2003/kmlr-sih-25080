// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white sticky top-0 z-50 shadow-lg">

      {/* Left Side Logo (CLICKABLE → GO TO HOME) */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-800 font-bold mr-3">
          🚉
        </div>
        <h2 className="m-0 text-xl font-bold font-inter">KMRL InsightVault</h2>
      </div>

      {/* Right Side Navigation */}
      <div className="flex gap-6 items-center">
        {!role ? (
          <>
            {/* Home */}
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

            {/* Login */}
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
          <>
            {/* Dashboard */}
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

            {/* Logout */}
            <Button
              onClick={handleLogout}
              className="w-auto !py-2 !px-4 bg-white/20 text-white hover:bg-white/30 border border-white/20 cursor-pointer"
            >
              Logout
            </Button>

            {/* Role Badge */}
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full capitalize">
              {role}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
