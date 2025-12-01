// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/button";


// - Shows Home + Login on Landing Page ("/")
// - Shows Dashboard + Logout + Role on authenticated pages
// - Uses 'loading' to prevent random flashes on refresh

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, logout,loading } = useAuth();

  // Hide Navbar completely on Login page
  if (location.pathname.startsWith("/login")) return null;

  // WAIT for AuthContext to restore role
  if (loading) return null;   

  // Force Home + Login UI on Landing Page (Public UI)
  if (location.pathname === "/") {
    return (
      <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-800 font-bold mr-3">
            🚉
          </div>
          <h2 className="m-0 text-xl font-bold font-inter">KMRL InsightVault</h2>
        </div>

        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className={`no-underline font-medium transition-colors py-2 px-4 rounded-lg ${
              location.pathname === "/"
                ? "bg-white text-blue-800 font-semibold"
                : "text-white hover:bg-blue-700"
            }`}
          >
            Home
          </Link>

          <Link
            to="/login"
            className="no-underline font-medium transition-colors py-2 px-4 rounded-lg text-white hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </nav>
    );
  }
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white sticky top-0 z-50 shadow-lg">

      {/* Left Side Logo */}
      <div className="flex items-center">
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

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              className="w-auto !py-2 !px-4 bg-white/20 text-white hover:bg-white/30 border border-white/20"
            >
              Logout
            </Button>

            {/* Role Badge */}
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full capitalize">
              {/*showing the role dynamically */}
              {role === "Administrator" ? "Administrator" : "Employee"}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
