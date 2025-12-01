// src/components/SidebarLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const { role } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen relative">
      {role && (
        <>
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
              onClick={() => setIsSidebarOpen(false)}
              role="presentation"
            />
          )}
        </>
      )}
      <div
        className={`${role ? "flex-1" : "w-full"} p-4 sm:p-6 min-h-screen transition-all duration-300`}
      >
        {role && (
          <button
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-lg bg-white border border-gray-200 text-gray-700 shadow-sm lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
            Menu
          </button>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;