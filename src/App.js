import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage"; // ⬅️ Import the new Dashboard
import DocumentDetailPage from "./pages/DocumentDetailPage";
import DashboardLayout from "./components/SidebarLayout";
import IntegrationsPage from "./pages/IntegrationsPage";
import SearchPage from "./pages/SearchPage";
import AllDocumentsPage from "./pages/AllDocumentsPage";
import DepartmentsPage from "./pages/DepartmentsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<DashboardLayout />}>
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
  );
}

export default App;
