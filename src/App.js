import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage"; // ⬅️ Import the new Dashboard
import DocumentDetailPage from "./pages/DocumentDetailPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/upload" element={<UploadPage />} /> */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/document/:id" element={<DocumentDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
