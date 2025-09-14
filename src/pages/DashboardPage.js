import React, { useState, useEffect } from "react";

const DashboardPage = () => {
  const [role, setRole] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const predefinedRoles = [
    { id: "admin", name: "Administrator", color: "bg-red-100 text-red-800" },
    { id: "hr", name: "Human Resources", color: "bg-blue-100 text-blue-800" },
    { id: "engineering", name: "Engineering", color: "bg-green-100 text-green-800" }
  ];

  // Simulate loading documents based on role
  useEffect(() => {
    if (role) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const sampleDocs = [
          {
            id: 1,
            name: "Q3 Environmental Report.pdf",
            size: "2.45 MB",
            type: "Environmental Report",
            date: new Date().toLocaleDateString(),
            priority: "HIGH",
            summary: "This report shows a 15% reduction in carbon emissions compared to last quarter, exceeding our sustainability goals.",
            tags: ["sustainability", "quarterly"]
          },
          {
            id: 2,
            name: "Employee Wellness Program.docx",
            size: "1.23 MB",
            type: "HR Policy",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            priority: "MEDIUM",
            summary: "New wellness initiatives to support employee mental health and work-life balance.",
            tags: ["wellness", "policy"]
          },
          {
            id: 3,
            name: "Infrastructure Upgrade Plan.pdf",
            size: "3.78 MB",
            type: "Technical Document",
            date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            priority: "HIGH",
            summary: "Plan to migrate servers to renewable energy sources by Q2 next year.",
            tags: ["infrastructure", "sustainability"]
          }
        ];
        setDocuments(sampleDocs);
        setLoading(false);
        setNotification(`Welcome ${predefinedRoles.find(r => r.id === role).name}!`);
        setTimeout(() => setNotification(null), 3000);
      }, 1000);
    }
  }, [role]);

  const handleLogin = (role) => {
    setRole(role);
    setSelectedDoc(null);
    setSearch("");
  };

  const handleLogout = () => {
    setRole(null);
    setDocuments([]);
    setSelectedDoc(null);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newDoc = {
        id: documents.length + 1,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        type: file.type.split('/')[1].toUpperCase() + " Document",
        date: new Date().toLocaleDateString(),
        priority: "MEDIUM",
        summary: "This is a mock AI summary of the uploaded document. The content appears to be relevant to your role and responsibilities.",
        tags: ["uploaded"]
      };
      setDocuments([...documents, newDoc]);
      setNotification(`Document "${file.name}" uploaded successfully!`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const deleteDocument = (id, e) => {
    e.stopPropagation();
    const doc = documents.find(d => d.id === id);
    setDocuments(documents.filter(doc => doc.id !== id));
    if (selectedDoc && selectedDoc.id === id) {
      setSelectedDoc(null);
    }
    setNotification(`Document "${doc.name}" deleted successfully!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.type.toLowerCase().includes(search.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH": return "bg-red-100 text-red-800";
      case "MEDIUM": return "bg-yellow-100 text-yellow-800";
      case "LOW": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fadeIn">
          {notification}
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        {!role ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Document Dashboard</h1>
              <p className="text-gray-600 text-center mb-8">Select your role to continue</p>
              
              <div className="space-y-4">
                {predefinedRoles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleLogin(r.id)}
                    className={`w-full py-3 px-4 rounded-lg transition-all duration-200 ${r.color} hover:opacity-90 font-medium`}
                  >
                    Login as {r.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Document Dashboard</h1>
                <p className="text-gray-600">
                  Welcome, <span className="font-medium">{predefinedRoles.find(r => r.id === role).name}</span>
                </p>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Logout
              </button>
            </div>

            {/* Search and Upload */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search documents by name, type or tags..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="w-full md:w-auto">
                  <label className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Document
                    <input type="file" onChange={handleUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Documents Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Your Documents</h2>
                  <span className="text-sm text-gray-600">{filteredDocs.length} documents</span>
                </div>
                
                {filteredDocs.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No documents found</h3>
                    <p className="mt-2 text-gray-500">Try adjusting your search or upload a new document.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md cursor-pointer ${selectedDoc?.id === doc.id ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={() => setSelectedDoc(doc)}
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <button 
                              onClick={(e) => deleteDocument(doc.id, e)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          
                          <h3 className="font-semibold text-gray-900 mb-1 truncate">{doc.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <span>{doc.size}</span>
                            <span className="mx-2">•</span>
                            <span>{doc.date}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(doc.priority)}`}>
                              {doc.priority}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {doc.type}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 rounded-md text-xs bg-blue-50 text-blue-700">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Document Detail */}
            {selectedDoc && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDoc.name}</h2>
                  <button 
                    onClick={() => setSelectedDoc(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Type</h3>
                    <p className="font-medium">{selectedDoc.type}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Size</h3>
                    <p className="font-medium">{selectedDoc.size}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Date</h3>
                    <p className="font-medium">{selectedDoc.date}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Priority</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedDoc.priority)}`}>
                    {selectedDoc.priority}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoc.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 rounded-md text-sm bg-blue-100 text-blue-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">AI Summary</h3>
                  <p className="text-gray-800 bg-blue-50 p-4 rounded-lg">{selectedDoc.summary}</p>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                  
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Share
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;