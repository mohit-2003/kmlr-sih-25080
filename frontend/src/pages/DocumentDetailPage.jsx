// src/pages/DocumentDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/card";
import { FileText } from "lucide-react";

const DocumentDetailPage = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/documents/${id}`);
        const data = await res.json();
        setDoc(data.document);
      } catch (err) {
        console.error("Error fetching document:", err);
      }
    };

    fetchDoc();
  }, [id]);

  if (!doc) {
    return (
      <div className="max-w-5xl mx-auto mt-10 px-4 text-center text-gray-600">
        Loading document...
      </div>
    );
  }

  const fileSizeMB = (doc.file_size / (1024 * 1024)).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto space-y-8 mt-8 px-4">

      {/* ========== HEADER ========== */}
      <Card className="p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4">
        <div className="p-4 bg-blue-100 rounded-xl">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {doc.file_name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Uploaded on{" "}
            {new Date(doc.createdAt).toLocaleDateString()}
          </p>
        </div>
      </Card>

      {/* ========== SHORT SUMMARY ========== */}
      {doc.short_summary_en && (
        <Card className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Short Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-[15px]">
            {doc.short_summary_en}
          </p>
        </Card>
      )}

      {/* ========== DETAILED SUMMARY ========== */}
      {doc.detailed_summary_en?.length > 0 && (
        <Card className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Detailed Summary
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {doc.detailed_summary_en.map((point, index) => (
              <li key={index} className="leading-relaxed text-[15px]">
                {point}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* ========== DOCUMENT INFO SECTION ========== */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Document Info
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 text-gray-800">
          <p><strong>Status:</strong> {doc.status}</p>
          <p><strong>File Type:</strong> {doc.file_type.replace("application/", "")}</p>
          <p><strong>File Size:</strong> {fileSizeMB} MB</p>
          <p><strong>Language:</strong> {doc.language_detected}</p>
          <p>
            <strong>OCR Confidence:</strong> {doc.ocr_confidence}%
          </p>
          <p>
            <strong>Departments:</strong>{" "}
            {doc.assigned_departments?.length
              ? doc.assigned_departments.join(", ")
              : "None"}
          </p>
        </div>

        {/* Tags */}
        {doc.tags?.length > 0 && (
          <div>
            <strong>Tags:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {doc.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>

    </div>
  );
};

export default DocumentDetailPage;
