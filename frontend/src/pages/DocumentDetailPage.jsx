import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DocumentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(true);

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/documents/${id}`
        );
        const data = await response.json();

        if (data.success) {
          setSelectedDoc(data.document);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to load document details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error || !selectedDoc)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Document Not Found
        </h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );

  const deadlines =
    selectedDoc.content_analysis?.deadlines?.split(";").map((d) => d.trim()) ||
    [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-800 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="ml-2">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedDoc.content_analysis?.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {selectedDoc.content_analysis?.doc_type} •{" "}
              {(selectedDoc.metadata?.file_size / 1000).toFixed(0)} KB •{" "}
              {new Date(selectedDoc.upload_time).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Priority */}
        <div className="mb-6">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase ${getPriorityColor(
              selectedDoc.content_analysis?.priority
            )}`}
          >
            {selectedDoc.content_analysis?.priority || "N/A"}
          </span>
        </div>

        {/* Departments */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Departments
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedDoc.content_analysis?.departments?.map((d, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-800 font-medium"
              >
                #{d}
              </span>
            ))}
          </div>
        </div>

        {/* AI Summary */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            AI Short Summary
          </h3>
          <p className="text-gray-800 bg-blue-50 p-4 rounded-lg border border-blue-100">
            {selectedDoc.content_analysis?.short_summary}
          </p>
        </div>

        {/* Detailed Summary */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Detailed Summary
            </h3>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDetails}
                onChange={() => setShowDetails(!showDetails)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm text-gray-600">Show</span>
            </label>
          </div>
          {showDetails && (
            <ul className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
              {selectedDoc.content_analysis?.detailed_summary?.map(
                (item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-gray-700 leading-snug"
                  >
                    <span className="text-green-500 mr-2">✔</span> {item}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        {/* Deadlines */}
        <div className="mb-6">
          <h3 className="text-sm font-normal text-gray-500 mb-2">Deadlines</h3>
          <ul className="space-y-2 bg-orange-50 border border-orange-100 p-4 rounded-lg text-sm">
            {deadlines.map((d, i) => (
              <li key={i} className="flex items-start text-gray-700">
                <span className="text-blue-500 mr-2">📅</span> {d}
              </li>
            ))}
          </ul>
        </div>

        {/* Key Entities */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Key Entities
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedDoc.content_analysis?.key_entities?.map((e, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700 border"
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md">
            ⬇ Download
          </button>
          <button className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
            🔗 Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailPage;
