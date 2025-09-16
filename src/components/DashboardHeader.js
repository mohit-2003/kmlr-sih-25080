import React from "react";

const DashboardHeader = ({ predefinedRoles, role, handleLogout }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          KMRL InsightVault
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome,{" "}
          <span className="font-semibold text-blue-600">
            {predefinedRoles.find((r) => r.id === role).name}
          </span>
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="px-5 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-sm hover:shadow-md border border-gray-200 font-medium flex items-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </div>
  );
};

export default DashboardHeader;
