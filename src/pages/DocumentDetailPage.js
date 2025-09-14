import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DocumentDetailPage = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ⬅️ Define the helper functions here, inside the component scope
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200";
      case "medium": return "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200";
      case "low": return "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200";
      default: return "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200";
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.').pop().toLowerCase(); // ⬅️ Added optional chaining
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

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/documents/${docId}`);
        const data = await response.json();
        
        if (data.success) {
          setSelectedDoc(data.document);
        } else {
          setError(data.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load document details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [docId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-gray-600 ml-4">Loading document details...</p>
      </div>
    );
  }

  if (error || !selectedDoc) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Document Not Found</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-start">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mr-4">
              {getFileIcon(selectedDoc.originalname)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedDoc.originalname}</h2>
              {/* ⬅️ Added optional chaining for nested properties */}
              <p className="text-gray-600 mt-1">{selectedDoc.content_analysis?.doc_type || 'N/A'} • {selectedDoc.metadata?.file_size || 'N/A'}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Type</h3>
            <p className="font-medium text-lg">{selectedDoc.content_analysis?.doc_type || 'N/A'}</p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Size</h3>
            <p className="font-medium text-lg">{selectedDoc.metadata?.file_size || 'N/A'}</p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Date</h3>
            <p className="font-medium text-lg">{selectedDoc.upload_time ? new Date(selectedDoc.upload_time).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Priority</h3>
          <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getPriorityColor(selectedDoc.content_analysis?.priority)}`}>
            {selectedDoc.content_analysis?.priority || 'N/A'}
          </span>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {selectedDoc.content_analysis?.departments?.map((tag, index) => (
              <span key={index} className="px-3 py-1.5 rounded-md text-sm bg-blue-100 text-blue-800 font-medium">
                #{tag}
              </span>
            )) || <span className="text-gray-500">No tags</span>}
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-600 mb-3">AI Summary</h3>
          <p className="text-gray-800 bg-blue-50 p-5 rounded-xl border border-blue-100">{selectedDoc.content_analysis?.short_summary || 'No summary available.'}</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
          
          <button className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailPage;