// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage"; 
import DocumentDetailPage from "./pages/DocumentDetailPage";
import DashboardLayout from "./components/SidebarLayout";
import IntegrationsPage from "./pages/IntegrationsPage";
import SearchPage from "./pages/SearchPage";
import AllDocumentsPage from "./pages/AllDocumentsPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes with Sidebar Layout */}
            <Route element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/documents" element={<AllDocumentsPage />} />
              <Route path="/document/:id" element={<DocumentDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;