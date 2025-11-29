// src/pages/AllDocumentsPage.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AllDocumentsPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedSource, setSelectedSource] = useState("all");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Mock data - replace with API data later
  const [documentsData, setDocumentsData] = useState({
    sources: [
      {
        name: "SharePoint",
        type: "sharepoint",
        documents: [
          {
            id: 1,
            title: "Metro Line 3 Environmental Impact Assessment",
            date: "January 15, 2024",
            department: "Environmental Planning",
            description: "Comprehensive environmental assessment for Metro Line 3 extension project",
            aiSummary: {
              title: "Comprehensive environmental assessment for Metro Line 3 extension project",
              keyPoints: [
                "Air quality impact assessment shows minimal negative effects",
                "Noise pollution mitigation measures recommended for residential areas",
                "Biodiversity conservation plan includes green corridor development",
                "Water resource management strategy for construction phase",
                "Community engagement and public consultation completed"
              ],
              visiblePoints: 3
            },
            uploadedDate: "1/16/2024",
            lastUpdated: "2024-01-15T10:30:00Z"
          }
        ]
      },
      {
        name: "Email",
        type: "email",
        documents: [
          {
            id: 2,
            title: "Smart Ticketing System Technical Specifications",
            date: "January 12, 2024",
            department: "Technical",
            description: "Technical specifications for next-generation contactless ticketing systems",
            aiSummary: {
              title: "Technical specifications for next-generation contactless ticketing systems",
              keyPoints: [
                "RFID and NFC technology integration for seamless passenger experience",
                "Backend system architecture supporting 1M+ daily transactions",
                "Mobile app integration with real-time balance updates",
                "Security protocols for fraud prevention and data protection",
                "Hardware specifications for ticket validators and gates"
              ],
              visiblePoints: 3
            },
            uploadedDate: "1/12/2024",
            lastUpdated: "2024-01-12T14:20:00Z"
          },
          {
            id: 3,
            title: "Monthly Revenue Analytics Report",
            date: "January 8, 2024",
            department: "Finance",
            description: "December 2023 revenue data analysis with trends and forecasting insights",
            uploadedDate: "1/8/2024",
            lastUpdated: "2024-01-08T09:15:00Z"
          }
        ]
      },
      {
        name: "Manual Upload",
        type: "manual",
        documents: [
          {
            id: 4,
            title: "Station Safety Protocols Manual",
            date: "January 10, 2024",
            department: "Safety",
            description: "Comprehensive safety protocols and emergency procedures for metro stations",
            uploadedDate: "1/10/2024",
            lastUpdated: "2024-01-10T11:45:00Z"
          }
        ]
      }
    ],
    recentActivity: [
      {
        title: "Metro Line 3 Environmental Impact Assessment",
        date: "Uploaded 1/16/2024"
      },
      {
        title: "Smart Ticketing System Technical Specifications",
        date: "Uploaded 1/12/2024"
      },
      {
        title: "Station Safety Protocols Manual",
        date: "Uploaded 1/10/2024"
      }
    ]
  });

  const allDocuments = documentsData.sources.flatMap(source => source.documents);
  const filteredDocuments = selectedSource === "all" 
    ? allDocuments 
    : documentsData.sources.find(source => source.type === selectedSource)?.documents || [];

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0] || event.dataTransfer?.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt', '.xlsx', '.xls'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      setUploadMessage("Error: Please upload PDF, DOC, DOCX, TXT, or XLSX files only.");
      setTimeout(() => setUploadMessage(""), 4000);
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setUploadMessage("Error: File size must be less than 10MB.");
      setTimeout(() => setUploadMessage(""), 4000);
      return;
    }

    setIsUploading(true);
    setUploadMessage("");
    setIsDragging(false);

    try {
      // Simulate API upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create new document object
      const newDocument = {
        id: Date.now(), // Temporary ID
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        department: "General",
        description: `Newly uploaded document: ${file.name}`,
        uploadedDate: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }).replace(/\//g, '/'),
        lastUpdated: new Date().toISOString(),
        file: file
      };

      // Update documents data - add to Manual Upload source
      setDocumentsData(prev => {
        const updatedSources = prev.sources.map(source => 
          source.type === "manual" 
            ? {
                ...source,
                documents: [newDocument, ...source.documents]
              }
            : source
        );

        return {
          ...prev,
          sources: updatedSources,
          recentActivity: [
            {
              title: newDocument.title,
              date: `Uploaded ${new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }).replace(/\//g, '/')}`
            },
            ...prev.recentActivity.slice(0, 2) // Keep only 3 recent activities
          ]
        };
      });

      setUploadMessage(`✅ Successfully uploaded "${file.name}"`);
      
      // Clear success message after 4 seconds
      setTimeout(() => setUploadMessage(""), 4000);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      setUploadMessage(`❌ Error uploading "${file.name}". Please try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e);
  };

  // Process document with AI
  const handleProcessWithAI = async (documentId) => {
    setUploadMessage("Processing document with AI...");

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDocumentsData(prev => ({
        ...prev,
        sources: prev.sources.map(source => ({
          ...source,
          documents: source.documents.map(doc => 
            doc.id === documentId 
              ? {
                  ...doc,
                  description: `🤖 AI Processed: ${doc.description}`,
                  lastUpdated: new Date().toISOString(),
                  aiSummary: {
                    title: `AI Generated Summary: ${doc.title}`,
                    keyPoints: [
                      "AI analysis completed successfully",
                      "Key insights extracted from document content",
                      "Executive summary generated",
                      "Action items identified",
                      "Risk assessment performed"
                    ],
                    visiblePoints: 3
                  }
                }
              : doc
          )
        }))
      }));

      setUploadMessage("✅ AI processing completed successfully!");
      setTimeout(() => setUploadMessage(""), 3000);
    } catch (error) {
      setUploadMessage("❌ Error processing document with AI.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
            <p className="text-gray-600">Manage and view your uploaded documents</p>
          </div>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.xlsx,.xls"
          />
          
          <button
            onClick={handleUploadClick}
            disabled={isUploading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isUploading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isUploading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Document
              </>
            )}
          </button>
        </div>

        {uploadMessage && (
          <div className={`p-3 rounded-md text-sm font-medium ${
            uploadMessage.includes("Error") || uploadMessage.includes("❌")
              ? "bg-red-100 text-red-800 border border-red-200"
              : uploadMessage.includes("Processing")
              ? "bg-blue-100 text-blue-800 border border-blue-200"
              : "bg-green-100 text-green-800 border border-green-200"
          }`}>
            {uploadMessage}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - 3/4 width */}
        <div className="lg:col-span-3 space-y-6">
          {/* Source Filter */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSelectedSource("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSource === "all" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Documents
              </button>
              {documentsData.sources.map(source => (
                <button
                  key={source.type}
                  onClick={() => setSelectedSource(source.type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSource === source.type 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {source.name}
                </button>
              ))}
            </div>

            {/* Drag & Drop Zone */}
            <div 
              className={`mb-6 p-8 border-2 border-dashed rounded-xl text-center transition-all cursor-pointer ${
                isDragging
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
            >
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-lg font-medium text-gray-700 mb-1">
                {isUploading ? "Uploading..." : "Drop files here or click to upload"}
              </p>
              <p className="text-sm text-gray-500">
                Supports PDF, DOC, DOCX, TXT, XLSX (Max. 10MB)
              </p>
              {isUploading && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Documents List */}
            <div className="space-y-6">
              {filteredDocuments.map(doc => (
                <div key={doc.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-colors">
                  {/* Document Header */}
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{doc.title}</h3>
                        <p className="text-gray-600 text-sm">
                          {doc.date} → {doc.department}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm text-gray-500">Select</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Summary Section */}
                  {doc.aiSummary && (
                    <div className="p-6 bg-blue-50 border-b border-blue-100">
                      <h4 className="font-semibold text-gray-900 mb-3">AI Summary</h4>
                      <p className="text-gray-700 mb-4">{doc.aiSummary.title}</p>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900 text-sm">Key Points:</h5>
                        <ul className="space-y-1">
                          {doc.aiSummary.keyPoints.slice(0, doc.aiSummary.visiblePoints).map((point, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                        {doc.aiSummary.keyPoints.length > doc.aiSummary.visiblePoints && (
                          <p className="text-sm text-blue-600 font-medium">
                            *{doc.aiSummary.keyPoints.length - doc.aiSummary.visiblePoints} more key points available
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t border-blue-200">
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                          View Full Document →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Document Actions */}
                  <div className="p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Uploaded {doc.uploadedDate}
                      </span>
                      <div className="flex gap-3">
                        {!doc.aiSummary && (
                          <button 
                            onClick={() => handleProcessWithAI(doc.id)}
                            className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Process with AI
                          </button>
                        )}
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Share
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - 1/4 width */}
        <div className="space-y-6">
          {/* Upload Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Upload</h3>
            <p className="text-gray-600 text-sm mb-4">
              Upload a document to get an AI-generated summary, key points, and action items.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 mb-4">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Extract key information
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Generate executive summary
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Identify action items
              </li>
            </ul>
            <button
              onClick={handleUploadClick}
              disabled={isUploading}
              className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${
                isUploading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {isUploading ? "Uploading..." : "Upload Document"}
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {documentsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-gray-500">{activity.date}</p>
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

export default AllDocumentsPage;