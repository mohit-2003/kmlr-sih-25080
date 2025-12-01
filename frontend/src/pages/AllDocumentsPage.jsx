// src/pages/AllDocumentsPage.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  UploadCloud,
  FileText,
  Inbox,
  Loader2,
  Cpu,
  FileCheck,
  AlertTriangle,
} from "lucide-react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const STATUS_PROGRESS = {
  UPLOADED: 10,
  PREPROCESSING: 25,
  PROCESSING_OCR: 50,
  PROCESSING_LLM: 80,
  COMPLETED: 100,
  FAILED: 100,
  UNREADABLE: 100,
};

const STATUS_LABEL = {
  UPLOADED: "Uploaded — waiting to start",
  PREPROCESSING: "Preparing document…",
  PROCESSING_OCR: "Extracting text (OCR)…",
  PROCESSING_LLM: "Analyzing content with AI…",
  COMPLETED: "Processed",
  FAILED: "Processing failed",
  UNREADABLE: "File unreadable",
};

const STATUS_ICON = (status) => {
  switch (status) {
    case "PROCESSING_OCR":
      return <Cpu className="w-5 h-5" />;
    case "PROCESSING_LLM":
      return <Loader2 className="w-5 h-5 animate-spin" />;
    case "COMPLETED":
      return <FileCheck className="w-5 h-5" />;
    case "FAILED":
    case "UNREADABLE":
      return <AlertTriangle className="w-5 h-5" />;
    default:
      return <UploadCloud className="w-5 h-5" />;
  }
};

const AllDocumentsPage = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [selectedSource, setSelectedSource] = useState("all");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const [documentsData, setDocumentsData] = useState({
    sources: [
      {
        name: "Manual Upload",
        type: "manual",
        documents: [],
      },
    ],
    recentActivity: [],
  });

  const [processingMap, setProcessingMap] = useState({});

  useEffect(() => {
    const fetchAllDocuments = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/documents?limit=9999`
        );
        const data = await res.json();

        if (!data?.documents) return;

        const mappedDocs = data.documents
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((doc) => ({
            id: doc.id,
            title: doc.file_name,
            date: new Date(doc.createdAt).toLocaleDateString(),
            department: doc.assigned_departments?.[0] || "General",
            uploadedDate: new Date(doc.createdAt).toLocaleDateString(),
            aiSummary: {
              title: doc.short_summary_en || "AI Summary",
              keyPoints: doc.detailed_summary_en || [],
              visiblePoints: 3,
            },
            raw: doc,
          }));

        setDocumentsData((prev) => ({
          ...prev,
          sources: [
            {
              ...prev.sources[0],
              documents: prev.sources[0].documents,
            },
          ],
          recentActivity: mappedDocs
            .slice(0, 5)
            .map((doc) => ({ title: doc.title, date: doc.uploadedDate })),
        }));
      } catch (err) {
        console.error("Error fetching all documents:", err);
      }
    };

    fetchAllDocuments();

    const lastId = localStorage.getItem("lastUploadedDocumentId");
    if (lastId) fetchLastUploaded(lastId);
  }, []);

  const fetchLastUploaded = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/documents/${id}`
      );
      const data = await res.json();
      const doc = data.document;
      if (!doc) return;

      const mappedDoc = {
        id: doc.id,
        title: doc.file_name,
        date: new Date(doc.createdAt).toLocaleDateString(),
        department: doc.assigned_departments?.[0] || "General",
        uploadedDate: new Date(doc.createdAt).toLocaleDateString(),
        aiSummary: {
          title: doc.short_summary_en || "AI Summary",
          keyPoints: doc.detailed_summary_en || [],
          visiblePoints: 3,
        },
        raw: doc,
      };

      setDocumentsData((prev) => ({
        ...prev,
        sources: [{ ...prev.sources[0], documents: [mappedDoc] }],
      }));
    } catch (err) {
      console.error("Error fetching last uploaded document:", err);
    }
  };

  const addFinalDocument = (doc) => {
    localStorage.setItem("lastUploadedDocumentId", doc.id);

    const newDocument = {
      id: doc.id,
      title: doc.file_name,
      date: new Date(doc.createdAt).toLocaleDateString(),
      department: doc.assigned_departments?.[0] || "General",
      description: doc.short_summary_en || "AI processed document",
      uploadedDate: new Date(doc.createdAt).toLocaleDateString(),
      aiSummary: {
        title: doc.short_summary_en || "AI Summary",
        keyPoints: doc.detailed_summary_en || [],
        visiblePoints: 3,
      },
      raw: doc,
    };

    setDocumentsData((prev) => {
      const updatedSources = prev.sources.map((src) =>
        src.type === "manual"
          ? {
              ...src,
              documents: [newDocument, ...src.documents],
            }
          : src
      );

      return {
        ...prev,
        sources: updatedSources,
        recentActivity: [
          { title: newDocument.title, date: newDocument.uploadedDate },
          ...prev.recentActivity,
        ].slice(0, 5),
      };
    });
  };

  const startPolling = (documentId, filename) => {
    setProcessingMap((m) => ({
      ...m,
      [documentId]: {
        status: "UPLOADED",
        progress: STATUS_PROGRESS["UPLOADED"],
        file_name: filename,
        uploadedAt: new Date().toLocaleTimeString(),
      },
    }));

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/documents/${documentId}`
        );
        const payload = await res.json();
        const doc = payload.document;
        if (!doc) return;

        const status = doc.status;
        const progress = STATUS_PROGRESS[status] ?? 0;

        setProcessingMap((m) => ({
          ...m,
          [documentId]: {
            ...(m[documentId] || {}),
            status,
            progress,
            file_name: doc.file_name || filename,
            uploadedAt:
              m[documentId]?.uploadedAt || new Date().toLocaleTimeString(),
            raw: doc,
          },
        }));

        if (["COMPLETED", "FAILED", "UNREADABLE"].includes(status)) {
          clearInterval(interval);

          if (status === "COMPLETED") {
            addFinalDocument(doc);

            setTimeout(() => {
              setProcessingMap((m) => {
                const clone = { ...m };
                delete clone[documentId];
                return clone;
              });
            }, 1200);
          } else {
            setTimeout(() => {
              setProcessingMap((m) => {
                const clone = { ...m };
                delete clone[documentId];
                return clone;
              });
            }, 7000);
          }
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2500);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0] || event.dataTransfer?.files?.[0];
    if (!file) return;

    const allowed = [".pdf", ".doc", ".docx", ".txt", ".xlsx", ".xls"];
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!allowed.includes(ext)) {
      setUploadMessage("❌ Unsupported file type.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setUploadMessage("❌ File must be less than 50MB.");
      return;
    }

    setIsUploading(true);
    setUploadMessage("⏳ Uploading & starting processing...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("employeeId", 21);

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/process-document`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const documentId = data.document_id || data.document?.id;

      if (!documentId) {
        const doc = data.document || data;
        if (doc?.id) addFinalDocument(doc);
      } else {
        startPolling(documentId, file.name);
      }

      setUploadMessage("⏳ Processing started. Showing live status...");
    } catch (err) {
      console.error(err);
      setUploadMessage("❌ Upload or backend error. See console.");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadMessage(""), 4000);
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e);
  };

  const allDocuments = documentsData.sources.flatMap((s) => s.documents);

  const filteredDocuments =
    selectedSource === "all"
      ? allDocuments
      : documentsData.sources.find((s) => s.type === selectedSource)
          ?.documents || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <Card className="p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
            <p className="text-gray-600">
              Manage and view your uploaded documents
            </p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.xlsx,.xls"
            onChange={handleFileUpload}
          />

          <Button
            onClick={handleUploadClick}
            disabled={isUploading}
            className={isUploading ? "bg-gray-400 cursor-not-allowed" : ""}
          >
            <UploadCloud className="w-5 h-5 inline-block mr-2" />
            {isUploading ? "Uploading..." : "Upload Document"}
          </Button>
        </div>

        {uploadMessage && (
          <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm">
            {uploadMessage}
          </div>
        )}
      </Card>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* MAIN AREA */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-8">
            {/* FILTER BUTTONS */}
            <div className="flex gap-3 mb-6">
              <Button
                className={`py-2 ${
                  selectedSource === "all" ? "" : "bg-gray-200 text-black"
                }`}
                onClick={() => setSelectedSource("all")}
              >
                All Documents
              </Button>

              {documentsData.sources.map((src) => (
                <Button
                  key={src.type}
                  className={`py-2 ${
                    selectedSource === src.type ? "" : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setSelectedSource(src.type)}
                >
                  {src.name}
                </Button>
              ))}
            </div>

            {/* DRAG & DROP */}
            <div
              className={`p-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition ${
                isDragging
                  ? "bg-green-50 border-green-400"
                  : "bg-gray-50 border-gray-300"
              }`}
              onClick={handleUploadClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Inbox className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-lg font-medium text-gray-700">
                {isUploading
                  ? "Uploading..."
                  : "Drop files here or click to upload"}
              </p>
              <p className="text-gray-500 text-sm">PDF, DOCX, XLSX supported</p>
            </div>

            {/* PROCESSING CARDS */}
            <div className="space-y-6 mt-8">
              {Object.entries(processingMap).map(([docId, p]) => (
                <Card
                  key={docId}
                  className="p-6 border border-gray-200 cursor-pointer hover:shadow-lg transition"
                  onClick={() => navigate(`/documents/${docId}`)}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-400 text-white">
                        {STATUS_ICON(p.status)}
                      </div>
                      <div>
                        {/* 🔥 FIXED OVERFLOW */}
                        <h3 className="font-semibold text-gray-900 block truncate max-w-[70%]">
                          {p.file_name}
                        </h3>

                        <p className="text-gray-500 text-sm">
                          {STATUS_LABEL[p.status] || "Processing..."}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">{p.uploadedAt}</div>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-500`}
                      style={{
                        width: `${p.progress}%`,
                        background:
                          p.status === "COMPLETED"
                            ? "linear-gradient(90deg,#06b6d4,#3b82f6)"
                            : undefined,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm text-gray-600">{p.progress}%</div>
                    <div className="flex items-center gap-2">
                      {p.status === "FAILED" && (
                        <div className="text-sm text-red-600">
                          Processing failed
                        </div>
                      )}
                      {p.status === "UNREADABLE" && (
                        <div className="text-sm text-yellow-600">
                          Unreadable
                        </div>
                      )}
                      {p.status === "COMPLETED" && (
                        <div className="text-sm text-green-600">
                          Processed — view details
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {/* FINAL DOCUMENT CARDS */}
              {filteredDocuments.map((doc) => (
                <Card
                  key={doc.id}
                  className="p-6 border border-gray-200 cursor-pointer hover:shadow-lg transition"
                  onClick={() => navigate(`/documents/${doc.id}`)}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <FileText className="w-6 h-6 text-indigo-600" />
                    <div>
                      {/* 🔥 FIXED OVERFLOW */}
                      <h3 className="font-semibold text-gray-900 block truncate max-w-[75%]">
                        {doc.title}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {doc.date} → {doc.department}
                      </p>
                    </div>
                  </div>

                  {/* SUMMARY */}
                  {doc.aiSummary && (
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm mb-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        AI Summary
                      </h4>

                      <p className="text-gray-700 mb-3">
                        {doc.aiSummary.title}
                      </p>

                      <ul className="list-disc ml-4 space-y-1">
                        {doc.aiSummary.keyPoints.slice(0, 3).map((p, index) => (
                          <li key={index} className="text-gray-700 text-sm">
                            {p}
                          </li>
                        ))}
                      </ul>

                      {doc.aiSummary.keyPoints.length > 3 && (
                        <button
                          className="mt-3 text-blue-600 text-sm font-medium hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/documents/${doc.id}`);
                          }}
                        >
                          View More →
                        </button>
                      )}
                    </div>
                  )}

                  <p className="text-sm text-gray-600">
                    Uploaded {doc.uploadedDate}
                  </p>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <Card className="p-8">
          <h3 className="font-semibold text-lg mb-5">Recent Activity</h3>

          {documentsData.recentActivity.map((act, i) => (
            <div key={i} className="flex gap-3 mb-4 text-sm">
              <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2"></div>
              <div>
                {/* 🔥 FIXED OVERFLOW */}
                <p className="font-medium block truncate max-w-[180px]">
                  {act.title}
                </p>

                <p className="text-gray-500">{act.date}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default AllDocumentsPage;
