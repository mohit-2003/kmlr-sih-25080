import React from "react";
import { NavLink } from "react-router-dom";
import { Home, FileText, Search, Layers } from "lucide-react";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">My App</h2>
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" end className={linkClasses}>
          <Home size={18} /> Dashboard
        </NavLink>
        <NavLink to="/documents" className={linkClasses}>
          <FileText size={18} /> All Documents
        </NavLink>
        <NavLink to="/search" className={linkClasses}>
          <Search size={18} /> Search
        </NavLink>
        <NavLink to="/integrations" className={linkClasses}>
          <Layers size={18} /> Integrations
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
