import React from "react";
// Ensures correct routing & navbar visibility
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import DocumentDetailPage from "./pages/DocumentDetailPage";
import DashboardLayout from "./components/SidebarLayout";
import IntegrationsPage from "./pages/IntegrationsPage";
import SearchPage from "./pages/SearchPage";
import AllDocumentsPage from "./pages/AllDocumentsPage";
import AddEmployeePage from "./pages/AddEmployeePage";
// Removed Vite alias because it loaded stale cached files.
// Using relative imports ensures correct Navbar + AuthContext mapping.
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

// App initializes global providers (AuthProvider + Router).
// All UI and routing happens inside AppContent to keep App clean.
function App() {
  return (
    // AuthProvider wraps the entire app so that authentication
    // state (role, name, login, logout) is available everywhere.

    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  // useLocation is used to detect the current route
  // so we can hide the Navbar on login page.
  const location = useLocation();
  const hideNavbarRoutes = ["/login"];

  return (
    <div className="min-h-screen bg-gray-50">

      {/*
        Hide Navbar on login page:
        Some pages (like login) should not show navbar.
        We compare the current route against a list of hidden routes
      */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/*
          Any route inside this block requires the user to be logged in.
           ProtectedRoute checks AuthContext and redirects to /login if unauthenticated.
           DashboardLayout provides sidebar + layout for all internal pages.
        */}
        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
             {/*
                DashboardLayout:
                Wraps protected pages with sidebar navigation and consistent UI.
              */} 
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/documents" element={<AllDocumentsPage />} />
          <Route path="/documents/:id" element={<DocumentDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/add-employee" element={<AddEmployeePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
