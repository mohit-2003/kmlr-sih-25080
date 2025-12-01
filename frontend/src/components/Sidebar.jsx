import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, FileText, Search, Layers, UserPlus, X } from "lucide-react";

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  //storing role to later use
  const { role } = useAuth();
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <aside
      className={`fixed top-[72px] bottom-0 left-0 z-40 w-72 bg-white border-r border-gray-200 p-4 shadow-xl transition-all duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:fixed lg:top-[72px] lg:translate-x-0 lg:shadow-none`}
    >
      <div className="flex items-center justify-between mb-6 lg:mb-10">
        <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" end className={linkClasses} onClick={onClose}>
          <Home size={18} /> Dashboard
        </NavLink>
        <NavLink to="/search" className={linkClasses} onClick={onClose}>
          <Search size={18} /> Search
        </NavLink>
        <NavLink to="/integrations" className={linkClasses} onClick={onClose}>
          <Layers size={18} /> Integrations
        </NavLink>
        <NavLink to="/documents" className={linkClasses} onClick={onClose}>
          <FileText size={18} /> Upload Docs
        </NavLink>
        {/* making sure only admin can add can employees*/}
        {role === "Administrator"&& (
          <NavLink to="/add-employee" className={linkClasses}>
            <UserPlus size={18} /> Add Employee
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
