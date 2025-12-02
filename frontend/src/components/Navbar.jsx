// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/button";


// - Shows Home + Login on Landing Page ("/")
// - Shows Dashboard + Logout + Role on authenticated pages
// - Uses 'loading' to prevent random flashes on refresh
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, logout,loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
    logout();
    navigate("/");
  };

  return (
    <nav className="px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left Side Logo (CLICKABLE → GO TO HOME) */}
        <div className="flex items-center justify-between gap-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-800 font-bold mr-3">
              🚉
            </div>
            <h2 className="m-0 text-xl font-bold font-inter">KMRL InsightVault</h2>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 bg-white/10 hover:bg-white/20 transition"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Right Side Navigation */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col gap-4 md:flex md:flex-row md:items-center md:gap-6`}
        >
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
                onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
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
              
            {/*Had to update this part as the changes were made to the role field of users table*}
            {/* Role Badge */}
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full capitalize">
              {role === "SUPER_ADMIN"
                ? "Super Admin"
                : role === "ADMIN"
                ? "Admin"
                : "Employee"}
            </span>
          </>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
