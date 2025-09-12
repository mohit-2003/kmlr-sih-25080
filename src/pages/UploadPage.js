import React from "react";
import Upload from "../components/UploadButton";

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 font-inter mb-3">
            Document Upload Dashboard
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your documents for processing and analysis. Supported formats include PDF, DOCX, and TXT files.
          </p>
        </div>
        <Upload />
      </div>
    </div>
  );
};

export default UploadPage;