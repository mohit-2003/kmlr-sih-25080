// src/pages/DocumentDetailPage.jsx
/** Prakhar Mishra
 DocumentDetailPage Overview
 
  This page displays the complete details of a single uploaded document.
  It fetches the document using its ID from the URL and renders:
 
   - File metadata (name, size, type, language, assigned departments)
   - Short summary and detailed bullet-point summary
   - OCR confidence and a warning badge if data quality is low
   - Tags, metadata, and access to the original document file
 
  The page includes safety checks to handle missing or malformed data and
  provides a loading state while fetching. It also scrolls the page to the top
  on mount for a smoother user experience.
 
  Overall, this page serves as the full in-depth view for any processed
  document, giving users all related insights in one place.
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/card";
import { FileText } from "lucide-react";

const DocumentDetailPage = () => {
  const { id } = useParams();

  // Scroll to top whenever this page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [doc, setDoc] = useState(null);

  /**
   Fetch document details using the ID from the URL.
   Stores the response in state and handles errors gracefully.
   */

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/documents/${id}`
        );
        const data = await res.json();
        setDoc(data.document);
      } catch (err) {
        console.error("Error fetching document:", err);
      }
    };

    fetchDoc();
  }, [id]);

  /** Loading state while fetch is in progress */
  if (!doc) {
    return (
      <div className="max-w-5xl mx-auto mt-10 px-4 text-center text-gray-600">
        Loading document...
      </div>
    );
  }

  // ========== SAFE VALUES ==========
  // Normalize and sanitize document values to avoid crashes on missing fields

  const ocrConfidence =
    typeof doc.ocr_confidence === "number" ? doc.ocr_confidence : 0;

  const fileSizeMB = doc.file_size
    ? (doc.file_size / (1024 * 1024)).toFixed(2)
    : "Unknown";

  const fileTypeLabel = doc.file_type
    ? doc.file_type.replace("application/", "")
    : "Unknown";

  const departments =
    Array.isArray(doc.assigned_departments) &&
    doc.assigned_departments.length > 0
      ? doc.assigned_departments
      : ["Not assigned"];

  const detailedSummary = Array.isArray(doc.detailed_summary_en)
    ? doc.detailed_summary_en
    : [];

  /**
    Return Layout Overview
   
    The page layout is structured into the following major sections:
   
    1. Header + OCR Quality Badge
       - Shows file name, upload date, and a warning badge for low OCR confidence.
   
    2. "Open Original Document" Button
       - Allows the user to view the actual uploaded file (PDF, image, etc.).
   
    3. Document Info Section
       - Displays metadata such as size, departments, language, status, etc.
   
    4. Short Summary
       - If available, gives a quick overview of the document's content.
   
    5. Detailed Summary
       - Shows a list of bullet-point insights generated from the document.
   
    6. Tags
       - Displays user/system-assigned tags for categorization.
   
    Each block is optional and rendered only if relevant data exists.
   */
  return (
    <div className="max-w-5xl mx-auto space-y-8 mt-8 px-4">
      {/* ========== HEADER WITH BADGE ========== */}
      <Card className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-start gap-4">
          <div className="p-4 bg-blue-100 rounded-xl">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 break-words max-w-[600px]">
              {doc.file_name}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Uploaded on {new Date(doc.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* RIGHT BADGE: Manual Review */}
        <div>
          {ocrConfidence < 60 && (
            <span className="px-3 py-1 text-xs font-semibold bg-red-600 text-white rounded-full shadow">
              MANUAL REVIEW REQUIRED
            </span>
          )}
        </div>
      </Card>

      {/* 🔥 ========== OPEN ORIGINAL DOCUMENT BUTTON ========== */}
      {doc.storage_url && (
        <a
          href={doc.storage_url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block px-5 py-2 bg-indigo-600 text-white 
            rounded-lg shadow hover:bg-indigo-700 
            transition mt-2
          "
        >
          Open Original Document
        </a>
      )}

      {/* ========== DOCUMENT INFO ========== */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Document Info
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 text-gray-800">
          <p>
            <strong>Status:</strong> {doc.status || "Unknown"}
          </p>
          <p>
            <strong>File Type:</strong> {fileTypeLabel}
          </p>
          <p>
            <strong>File Size:</strong> {fileSizeMB} MB
          </p>
          <p>
            <strong>Language:</strong> {doc.language_detected || "Unknown"}
          </p>
          <p>
            <strong>OCR Confidence:</strong> {ocrConfidence}%
          </p>
          <p>
            <strong>Departments:</strong> {departments.join(", ")}
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
      {detailedSummary.length > 0 && (
        <Card className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Detailed Summary
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {detailedSummary.map((point, index) => (
              <li key={index} className="leading-relaxed text-[15px]">
                {point}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* ========== TAGS ========== */}
      {Array.isArray(doc.tags) && doc.tags.length > 0 && (
        <Card className="p-6 sm:p-8">
          <strong className="text-xl">Tags</strong>
          <div className="flex flex-wrap gap-2 mt-4">
            {doc.tags.map((tag, idx) => (
              <span
                key={idx}
                className="
                  px-3 py-1 bg-gray-100 text-gray-700 
                  rounded-full text-sm border
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DocumentDetailPage;
