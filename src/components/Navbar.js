import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  // Helper function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-800 font-bold mr-3">
          🚉
        </div>
        <h2 className="m-0 text-xl font-bold font-inter">KMRL Intelligence Platform</h2>
      </div>
      <div className="flex gap-6">
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
          to="/upload" 
          className={`no-underline font-medium transition-colors py-2 px-4 rounded-lg ${
            isActive("/upload") 
              ? "bg-white text-blue-800 font-semibold" 
              : "text-white hover:bg-blue-700"
          }`}
        >
          Upload Documents
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;