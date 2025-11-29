// src/components/SidebarLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { role } = useAuth();

  return (
    <div className="flex">
      {role && <Sidebar />} {/* Sidebar only shows when logged in */}
      <div className={`${role ? "flex-1" : "w-full"} p-6 bg-gray-50 min-h-screen transition-all duration-300`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;