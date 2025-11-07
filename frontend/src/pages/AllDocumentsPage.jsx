import React from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useDashboard from "./useDashboard";

const AllDocumentsPage = () => {
  const navigate = useNavigate();

  const {
    loading,
    filteredDocs,
    deleteDocument,
    getPriorityColor,
    getFileIcon,
  } = useDashboard();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Documents</h1>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="mb-6 flex justify-between items-center">
            {filteredDocs.length === 0 && (
              <h2 className="text-xl font-semibold text-gray-800">
                {"No Documents"}
              </h2>
            )}
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
              {filteredDocs.length} documents
            </span>
          </div>

          {filteredDocs.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No documents found
              </h3>
              <p className="text-gray-500 mb-6">
                Try uploading a new document from the Dashboard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredDocs.map((doc) => (
                <div
                  key={doc._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md cursor-pointer transform hover:-translate-y-1"
                  onClick={() => navigate(`/document/${doc._id}`)}
                >
                  <div className="p-6">
                    {/* Top Bar */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        {getFileIcon(doc.originalname)}
                      </div>
                      <button
                        onClick={(e) => deleteDocument(doc._id, e)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-semibold text-gray-900 mb-1 line-clamp-2"
                      style={{ minHeight: "2rem" }}
                    >
                      {doc.content_analysis?.title || doc.originalname}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {doc.content_analysis?.status || "Processing complete"}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <span>{doc.metadata?.file_size || "Unknown size"}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {doc.upload_time
                          ? new Date(doc.upload_time).toLocaleDateString()
                          : "Unknown date"}
                      </span>
                    </div>

                    {/* Tags / Priority */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          doc.content_analysis?.priority
                        )}`}
                      >
                        {doc.content_analysis?.priority || "Unknown"}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {doc.content_analysis?.doc_type || "Unknown type"}
                      </span>
                    </div>

                    {/* Departments */}
                    <div className="flex flex-wrap gap-1">
                      {doc.content_analysis?.departments?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-700"
                        >
                          #{tag}
                        </span>
                      )) || (
                        <span className="text-xs text-gray-500">No tags</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllDocumentsPage;
