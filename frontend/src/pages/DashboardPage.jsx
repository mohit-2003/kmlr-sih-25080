// src/pages/DashboardPage.jsx

/**
  DashboardPage Overview
 
  This page serves as the main landing screen for authenticated users.
  It displays:
   - A personalized greeting using the user's name and time-of-day logic
   - Quick actions for frequently used features (e.g., Upload Documents)
   - A list of the user's most recent document uploads
 
  The page fetches the latest 5 uploaded documents from the backend and
  displays them using the DocumentCard component. It handles loading states,
  empty states, and data transformation to ensure consistent rendering.
 
  DashboardPage acts as a centralized summary view, giving users an overview
  of their activity and quick access to key workflows.
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import DocumentCard from "@/components/DocumentCard"; 

/**
  DashboardPage Overview
 
  This component displays:
   - A greeting personalized by time of day and user name
   - Quick Actions for fast navigation (Upload Documents, etc.)
   - Most recent uploaded documents, fetched from the backend
 
  The page acts as a high-level summary providing quick access
  and recent activity visualization for the user.
 */

const DashboardPage = () => {
  const navigate = useNavigate();
  const { name } = useAuth();

  const [recentDocs, setRecentDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Greeting
  /**
    Determine the appropriate greeting based on current hour.
    Used to personalize the dashboard experience.
   */
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Fetch latest 5 documents, Prakhar
  const fetchRecent = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/documents?limit=5`
      );
      const payload = await res.json();
      if (payload?.documents) {
        // Normalizing the data used by DocumentCard
        setRecentDocs(
          payload.documents.map((d) => ({
            id: d.id,
            file_name: d.file_name,
            createdAt: d.createdAt,
            short_summary_en: d.short_summary_en || "",
          }))
        );
      } else {
        setRecentDocs([]);
      }
    } catch (err) {
      console.error("Failed to fetch recent docs:", err);
      setRecentDocs([]);
    } finally {
      setLoading(false);
    }
  };
  // Triggers the recent document fetch on initial page load, 
  useEffect(() => {
    fetchRecent();
  }, []);

   /**
    Page Layout Structure (Returned JSX)
   
    The dashboard UI is organized into three main sections:
   
    1. Greeting Section
       - Displays a personalized time-based greeting and the user’s name.
       - Provides a friendly, contextual introduction to the page.
   
    2. Quick Actions
       - Offers fast access to frequently used tasks (e.g., uploading documents).
       - Uses simple buttons styled as actionable tiles.
   
    3. Recent Uploads
       - Shows the user's five most recently uploaded documents.
       - Dynamically handles three states:
           a) Loading → shows a progress message
           b) No results → shows an empty state message
           c) Results available → displays DocumentCard components
   
   The layout uses a vertical spaced stack with responsive sizing
    and centers the content for a clean dashboard experience.
   */
  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">

      {/* Greeting */}
      <Card>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {greeting}, {name}
          </h1>
          <p className="text-gray-600">Here's your personalized briefing for today</p>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <h3 className="font-semibold text-lg mb-2">Quick Actions</h3>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/documents")}
            className="w-full flex items-center justify-between p-3 border rounded-xl hover:bg-blue-50 transition"
          >
            <span className="font-medium text-gray-700">Upload Documents</span>
            <Upload className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </Card>

      {/* Recent Uploads */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Uploads</h2>

        {loading ? (
          <div className="py-8 text-center text-gray-600">Loading recent uploads...</div>
        ) : recentDocs.length === 0 ? (
          <div className="py-8 text-center text-gray-600">No recent uploads</div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {recentDocs.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} compact />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;
