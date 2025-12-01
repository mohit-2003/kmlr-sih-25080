import React from "react";
import { NavLink } from "react-router-dom";
//need of it for the verification of admin
import { useAuth } from "../context/AuthContext";
import { Home, FileText, Search, Layers, UserPlus } from "lucide-react";

const Sidebar = () => {
  //storing role to later use
  const { role } = useAuth();
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" end className={linkClasses}>
          <Home size={18} /> Dashboard
        </NavLink>
        <NavLink to="/search" className={linkClasses}>
          <Search size={18} /> Search
        </NavLink>
        <NavLink to="/integrations" className={linkClasses}>
          <Layers size={18} /> Integrations
        </NavLink>
        <NavLink to="/documents" className={linkClasses}>
          <FileText size={18} /> All Documents
        </NavLink>
        {/* making sure only admin can add can employees*/}
        {role === "Administrator"&& (
          <NavLink to="/add-employee" className={linkClasses}>
            <UserPlus size={18} /> Add Employee
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
