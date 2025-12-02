import React from "react";
import Upload from "../components/UploadButton";

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 font-inter mb-3">
            Document Upload
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your documents for AI-powered processing and analysis.  
            <br className="hidden sm:block" />
            <span className="text-sm text-gray-500">
              Supported formats: <strong>PDF, DOCX, TXT</strong>
            </span>
          </p>
        </div>

        {/* Upload Card */}
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Select and Upload File
          </h2>
          <Upload />
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
