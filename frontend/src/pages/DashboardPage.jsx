import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { FileText, AlertTriangle, Upload, ArrowRight, Database } from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Colors for departments (UI Highlighting)
  const departmentColors = {
    "Environmental Planning": "bg-green-100 text-green-800",
    Technical: "bg-blue-100 text-blue-800",
    Safety: "bg-red-100 text-red-800",
  };

  // Priority colors
  const priorityStyles = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  const dashboardData = {
    stats: {
      totalDocuments: 6,
      highPriority: 3,
      recentUploads: 2
    },
    recentDocuments: [
      {
        title: "Metro Line 3 Environmental Impact Assessment",
        description:
          "Comprehensive environmental assessment for Metro Line 3 extension project",
        source: "SharePoint",
        date: "Jan 15, 2024",
        priority: "high",
        department: "Environmental Planning"
      },
      {
        title: "Smart Ticketing System Technical Specifications",
        description:
          "Technical specifications for next-generation contactless ticketing systems...",
        source: "Email",
        date: "Jan 12, 2024",
        priority: "high",
        department: "Technical"
      },
      {
        title: "Station Safety Protocols Manual",
        description:
          "Comprehensive safety protocols and emergency procedures for metro stations...",
        source: "Manual Upload",
        date: "Jan 10, 2024",
        priority: "high",
        department: "Safety"
      }
    ]
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* Header */}
      <Card>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {greeting}, System Administrator
        </h1>
        <p className="text-gray-600">Here's your personalized briefing for today</p>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Total Documents */}
            <Card className="hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Documents</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardData.stats.totalDocuments}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            {/* High Priority */}
            <Card className="hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardData.stats.highPriority}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </Card>

            {/* Recent Uploads */}
            <Card className="hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Recent Uploads</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardData.stats.recentUploads}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

          </div>

          {/* Recent Documents */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Documents</h2>
              <button
                onClick={() => navigate("/documents")}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All <ArrowRight size={14} />
              </button>
            </div>

            <div className="space-y-4">
              {dashboardData.recentDocuments.map((doc, i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition cursor-pointer"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      {doc.title}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${priorityStyles[doc.priority]}`}
                      >
                        {doc.priority.toUpperCase()} PRIORITY
                      </span>
                    </h3>
                    <span className="text-sm text-gray-500">{doc.date}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{doc.description}</p>

                  <div className="flex gap-2">
                    <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
                      {doc.source}
                    </span>

                    {/* Department Highlight */}
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        departmentColors[doc.department] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {doc.department}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Column */}
        <div className="space-y-6">

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Data Connections</h2>
            <p className="text-gray-600 text-sm mb-4">Connect external sources</p>

            <Button onClick={() => navigate("/integrations")}>
              <span className="flex items-center justify-center gap-2">
                <Database size={18} /> Connect Sources
              </span>
            </Button>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <button
              onClick={() => navigate("/documents")}
              className="w-full flex items-center justify-between p-4 border rounded-xl hover:border-blue-300 hover:bg-blue-50 transition"
            >
              <span className="font-medium text-gray-900">Upload Documents</span>
              <Upload className="w-5 h-5 text-gray-500" />
            </button>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>

            {dashboardData.recentDocuments.slice(0, 3).map((doc, i) => (
              <div key={i} className="flex items-start text-sm text-gray-700 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-gray-500">Uploaded {doc.date}</p>
                </div>
              </div>
            ))}
          </Card>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
