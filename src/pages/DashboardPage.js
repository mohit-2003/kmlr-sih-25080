import React from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import RolePage from "../components/RolePage";
import DashboardHeader from "../components/DashboardHeader";
import SearchAndUpload from "../components/SearchAndUpload";
import Spinner from "../components/Spinner";
import useDashboard from "./useDashboard";

const DashboardPage = () => {
  const navigate = useNavigate();

  const {
    notification,
    loginData,
    setLoginData,
    handleLoginSubmit,
    role,
    predefinedRoles,
    handleLogin,
    handleLogout,
    search,
    setSearch,
    handleUpload,
    loading,
    filteredDocs,
    deleteDocument,
    getPriorityColor,
    getFileIcon,
    showLoginForm,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {showLoginForm ? (
          <LoginPage
            loginData={loginData}
            setLoginData={setLoginData}
            handleLogin={handleLoginSubmit}
          />
        ) : !role ? (
          <RolePage
            predefinedRoles={predefinedRoles}
            handleLogin={handleLogin}
          />
        ) : (
          <>
            {/* Header */}
            <DashboardHeader
              predefinedRoles={predefinedRoles}
              role={role}
              handleLogout={handleLogout}
            />

            {/* Search and Upload */}
            <SearchAndUpload
              search={search}
              setSearch={setSearch}
              handleUpload={handleUpload}
            />

            {/* Documents Grid */}
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Your Documents
                  </h2>
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
                      Try adjusting your search or upload a new document.
                    </p>
                    <label className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-medium">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Upload Your First Document
                      <input
                        type="file"
                        onChange={handleUpload}
                        className="hidden"
                      />
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

                          <h3
                            className="font-semibold text-gray-900 mb-1 line-clamp-2"
                            style={{ minHeight: "2rem" }}
                          >
                            {doc.content_analysis?.title || doc.originalname}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {doc.content_analysis?.status ||
                              "Processing complete"}
                          </p>

                          <div className="flex items-center text-sm text-gray-600 mb-4">
                            <span>
                              {doc.metadata?.file_size || "Unknown size"}
                            </span>
                            <span className="mx-2">•</span>
                            <span>
                              {doc.upload_time
                                ? new Date(doc.upload_time).toLocaleDateString()
                                : "Unknown date"}
                            </span>
                          </div>

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

                          <div className="flex flex-wrap gap-1">
                            {doc.content_analysis?.departments?.map(
                              (tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-700"
                                >
                                  #{tag}
                                </span>
                              )
                            ) || (
                              <span className="text-xs text-gray-500">
                                No tags
                              </span>
                            )}
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
