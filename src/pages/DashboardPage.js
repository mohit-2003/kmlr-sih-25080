import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [role, setRole] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const predefinedRoles = [
    { id: "admin", name: "Administrator", color: "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200" },
    { id: "hr", name: "Human Resources", color: "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200" },
    { id: "engineering", name: "Engineering", color: "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200" }
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      setShowLoginForm(false);
      setNotification("Login successful!");
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification("Please enter both username and password");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      if (role) {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:5000/api/documents');
          const data = await response.json();
          if (data.success) {
            setDocuments(data.documents);
          } else {
            setNotification("Failed to fetch documents.");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          setNotification("Failed to connect to server.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDocuments();
  }, [role]);

  const handleLogin = (role) => {
    setRole(role);
    setSearch("");
  };

  const handleLogout = () => {
    setRole(null);
    setDocuments([]);
    setShowLoginForm(true);
    setLoginData({ username: "", password: "" });
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newDoc = {
        _id: Date.now().toString(),
        originalname: file.name,
        metadata: {
          file_size: (file.size / 1024 / 1024).toFixed(2) + " MB"
        },
        upload_time: new Date().toISOString(),
        content_analysis: {
          priority: "medium",
          doc_type: file.type.split('/')[1].toUpperCase() + " Document",
          departments: ["uploaded"],
          summary: "This is a mock AI summary of the uploaded document."
        }
      };
      setDocuments([...documents, newDoc]);
      setNotification(`Document "${file.name}" uploaded successfully!`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const deleteDocument = (id, e) => {
    e.stopPropagation();
    const doc = documents.find(d => d._id === id);
    if (doc) {
      setDocuments(documents.filter(doc => doc._id !== id));
      setNotification(`Document "${doc.originalname}" deleted successfully!`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const filteredDocs = documents.filter((doc) => {
    if (!doc) return false;
    
    const nameMatch = doc.originalname && 
      doc.originalname.toLowerCase().includes(search.toLowerCase());
    
    const typeMatch = doc.content_analysis?.doc_type &&
      doc.content_analysis.doc_type.toLowerCase().includes(search.toLowerCase());
    
    const tagMatch = doc.content_analysis?.departments &&
      doc.content_analysis.departments.some(tag => 
        tag && tag.toLowerCase().includes(search.toLowerCase())
      );
    
    return nameMatch || typeMatch || tagMatch;
  });

  const getPriorityColor = (priority) => {
    if (!priority) return "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200";
    
    switch (priority.toLowerCase()) {
      case "high": return "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200";
      case "medium": return "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200";
      case "low": return "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200";
      default: return "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200";
    }
  };

  const getFileIcon = (fileName) => {
    if (!fileName) {
      return (
        <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    }
    
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'docx':
      case 'doc':
        return (
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          {notification}
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        {showLoginForm ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-md mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">KMRI Intelligence Platform</h1>
                <p className="text-gray-600">Sign in to access your documents</p>
              </div>
              
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={loginData.username}
                      onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-medium flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </button>
              </form>
            </div>
          </div>
        ) : !role ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-2xl p-10 bg-white rounded-2xl shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-md mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">KMRI Intelligence Platform</h1>
                <p className="text-gray-600">Select your role to continue</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {predefinedRoles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleLogin(r.id)}
                    className={`p-6 rounded-xl transition-all duration-300 ${r.color} hover:shadow-md hover:-translate-y-1 flex flex-col items-center`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-white shadow-inner mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="font-medium">Login as {r.name}</span>
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
                <h1 className="text-3xl font-bold text-gray-800 mb-1">KMRI Intelligence Platform</h1>
                <p className="text-gray-600 text-lg">
                  Welcome, <span className="font-semibold text-blue-600">{predefinedRoles.find(r => r.id === role).name}</span>
                </p>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-sm hover:shadow-md border border-gray-200 font-medium flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>

            {/* Search and Upload */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
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
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                  />
                </div>
                
                <div className="w-full md:w-auto">
                  <label className="flex items-center justify-center px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-medium">
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
              <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading your documents...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Your Documents</h2>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">{filteredDocs.length} documents</span>
                </div>
                
                {filteredDocs.length === 0 ? (
                  <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No documents found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search or upload a new document.</p>
                    <label className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-medium">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Your First Document
                      <input type="file" onChange={handleUpload} className="hidden" />
                    </label>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredDocs.map((doc) => (
                      <div
                        key={doc._id}
                        className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md cursor-pointer transform hover:-translate-y-1`}
                        onClick={() => navigate(`/documents/${doc._id}`)}
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                              {getFileIcon(doc.originalname)}
                            </div>
                            <button 
                              onClick={(e) => deleteDocument(doc._id, e)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2" style={{ height: '3rem' }}>{doc.originalname}</h3>
                          <div className="flex items-center text-sm text-gray-600 mb-4">
                            <span>{doc.metadata?.file_size || "Unknown size"}</span>
                            <span className="mx-2">•</span>
                            <span>{doc.upload_time ? new Date(doc.upload_time).toLocaleDateString() : "Unknown date"}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(doc.content_analysis?.priority)}`}>
                              {doc.content_analysis?.priority || "Unknown"}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {doc.content_analysis?.doc_type || "Unknown type"}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {doc.content_analysis?.departments?.map((tag, index) => (
                              <span key={index} className="px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-700">
                                #{tag}
                              </span>
                            )) || <span className="text-xs text-gray-500">No tags</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;