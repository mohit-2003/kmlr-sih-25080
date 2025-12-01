// src/components/ProtectedRoute.jsx
// PROTECTED ROUTE:
// Blocks access to dashboard pages unless role exists.
// Uses 'loading' to avoid redirect before AuthContext restores state.

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  // Wait for AuthContext to finish restoring session.
  const { role,loading } = useAuth();
  const location = useLocation();


  // Wait until AuthContext restores role from localStorage
  if (loading) {
    return <div>Loading...</div>; // Or spinner component
  }

  // Block employees from accessing Add Employee page manually
  if (role !== "Administrator" && location.pathname === "/add-employee") {
    return <Navigate to="/dashboard" replace />;
  }

  if (!role) {
    // If not logged in => redirect to login page.
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;