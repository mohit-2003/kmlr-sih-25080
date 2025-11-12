// src/pages/DashboardPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  // Mock data - replace with API data later
  const dashboardData = {
    stats: {
      totalDocuments: 6,
      highPriority: 3,
      recentUploads: 2
    },
    recentDocuments: [
      {
        title: "Metro Line 3 Environmental Impact Assessment",
        description: "Comprehensive environmental assessment for Metro Line 3 extension project",
        source: "SharePoint",
        date: "Jan 15, 2024",
        priority: "high",
        department: "Environmental Planning"
      },
      {
        title: "Smart Ticketing System Technical Specifications",
        description: "Technical specifications for next-generation contactless ticketing systems...",
        source: "Email",
        date: "Jan 12, 2024",
        priority: "high",
        department: "Technical"
      },
      {
        title: "Station Safety Protocols Manual",
        description: "Comprehensive safety protocols and emergency procedures for metro stations...",
        source: "Manual Upload",
        date: "Jan 10, 2024",
        priority: "high",
        department: "Safety"
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Good morning, System Administrator
        </h1>
        <p className="text-gray-600">
          Here's your personalized briefing for today
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats & Documents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.totalDocuments}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.highPriority}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recent Uploads</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.recentUploads}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Documents</h2>
              <button 
                onClick={() => navigate('/documents')}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All →
              </button>
            </div>
            
            <div className="space-y-4">
              {dashboardData.recentDocuments.map((doc, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      {doc.title}
                      {doc.priority === "high" && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          High Priority
                        </span>
                      )}
                    </h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap">{doc.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{doc.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {doc.source}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {doc.department}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Share
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Connections */}
        <div className="space-y-6">
          {/* Data Connections */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Data Connections</h2>
            <p className="text-gray-600 text-sm mb-4">Connect external sources</p>
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              Connect Sources
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <span className="font-medium text-gray-900">Upload Documents</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <span className="font-medium text-gray-900">AI-powered Analysis</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <span className="font-medium text-gray-900">Process with AI</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {dashboardData.recentDocuments.slice(0, 3).map((doc, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-900">{doc.title}</p>
                    <p className="text-gray-500">Uploaded {doc.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;