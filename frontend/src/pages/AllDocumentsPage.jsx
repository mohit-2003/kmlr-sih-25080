import React, { useState, useRef } from "react";
import { UploadCloud, FileText, Inbox } from "lucide-react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

const AllDocumentsPage = () => {
  const fileInputRef = useRef(null);
  const [selectedSource, setSelectedSource] = useState("all");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // ---------------------------
  // MOCK DATA (still kept)
  // ---------------------------
  const [documentsData, setDocumentsData] = useState({
    sources: [
      {
        name: "SharePoint",
        type: "sharepoint",
        documents: [
          {
            id: 1,
            title: "Metro Line 3 Environmental Impact Assessment",
            date: "January 15, 2024",
            department: "Environmental Planning",
            description:
              "Comprehensive environmental assessment for Metro Line 3 extension project",
            aiSummary: {
              title: "Environmental Impact Summary",
              keyPoints: [
                "Air quality impact assessment shows minimal effects",
                "Noise pollution mitigation strategies",
                "Biodiversity conservation via green corridor",
              ],
              visiblePoints: 3,
            },
            uploadedDate: "1/16/2024",
          },
        ],
      },

      {
        name: "Email",
        type: "email",
        documents: [
          {
            id: 2,
            title: "Smart Ticketing System Technical Specifications",
            date: "January 12, 2024",
            department: "Technical",
            description: "Technical specs for next-gen ticketing",
            aiSummary: {
              title: "Smart Ticketing Insights",
              keyPoints: [
                "RFID + NFC enabled",
                "Supports 1M+ transactions/day",
                "App sync in real-time",
              ],
              visiblePoints: 3,
            },
            uploadedDate: "1/12/2024",
          },
        ],
      },

      {
        name: "Manual Upload",
        type: "manual",
        documents: [
          {
            id: 3,
            title: "Station Safety Protocols Manual",
            date: "January 10, 2024",
            department: "Safety",
            description: "Safety protocols for metro stations",
            uploadedDate: "1/10/2024",
          },
        ],
      },
    ],

    recentActivity: [
      { title: "Metro Line 3 Environmental Impact Assessment", date: "Uploaded 1/16/2024" },
      { title: "Smart Ticketing System Technical Specifications", date: "Uploaded 1/12/2024" },
      { title: "Station Safety Protocols Manual", date: "Uploaded 1/10/2024" },
    ],
  });

  const allDocuments = documentsData.sources.flatMap((s) => s.documents);
  const filteredDocuments =
    selectedSource === "all"
      ? allDocuments
      : documentsData.sources.find((s) => s.type === selectedSource)?.documents || [];

  // -------------------------------------
  // FILE UPLOAD + API CALL
  // -------------------------------------
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0] || event.dataTransfer?.files?.[0];
    if (!file) return;

    const allowed = [".pdf", ".doc", ".docx", ".txt", ".xlsx", ".xls"];
    const ext = "." + file.name.split(".").pop().toLowerCase();

    if (!allowed.includes(ext)) {
      setUploadMessage("❌ Unsupported file type.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadMessage("❌ File must be less than 10MB.");
      return;
    }

    setIsUploading(true);
    setUploadMessage("⏳ Uploading & Processing...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("employeeId", 0);

      const res = await fetch("http://localhost:5000/api/v1/process-document", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      const newDocument = {
        id: Date.now(),
        title: data.data?.metadata?.original_filename || file.name,
        date: new Date().toLocaleDateString(),
        department: "General",
        description: data.data?.content_analysis?.short_summary_en || "AI processed document",
        uploadedDate: new Date().toLocaleDateString(),
        aiSummary: {
          title: data.data?.content_analysis?.title || "AI Summary",
          keyPoints: data.data?.content_analysis?.detailed_summary || [],
          visiblePoints: 3,
        },
      };

      setDocumentsData((prev) => {
        const updatedSources = prev.sources.map((src) =>
          src.type === "manual"
            ? { ...src, documents: [newDocument, ...src.documents] }
            : src
        );

        return {
          ...prev,
          sources: updatedSources,
          recentActivity: [
            { title: newDocument.title, date: "Uploaded just now" },
            ...prev.recentActivity,
          ],
        };
      });

      setUploadMessage("✅ Document processed successfully!");
    } catch (err) {
      console.error(err);
      setUploadMessage("❌ Backend not running. Start the server.");
    }

    setIsUploading(false);
    setTimeout(() => setUploadMessage(""), 3500);
  };

  // -------------- DRAG + CLICK HANDLERS ----------------
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

  // -------------------------------------
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <Card className="p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
            <p className="text-gray-600">Manage and view your uploaded documents</p>
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

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-8">
            {/* FILTER BUTTONS */}
            <div className="flex gap-3 mb-6">
              <Button
                className={`py-2 ${selectedSource === "all" ? "" : "bg-gray-200 text-black"}`}
                onClick={() => setSelectedSource("all")}
              >
                All Documents
              </Button>

              {documentsData.sources.map((src) => (
                <Button
                  key={src.type}
                  className={`py-2 ${selectedSource === src.type ? "" : "bg-gray-200 text-black"}`}
                  onClick={() => setSelectedSource(src.type)}
                >
                  {src.name}
                </Button>
              ))}
            </div>

            {/* DRAG DROP */}
            <div
              className={`p-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition ${
                isDragging ? "bg-green-50 border-green-400" : "bg-gray-50 border-gray-300"
              }`}
              onClick={handleUploadClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Inbox className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-lg font-medium text-gray-700">
                {isUploading ? "Uploading..." : "Drop files here or click to upload"}
              </p>
              <p className="text-gray-500 text-sm">PDF, DOCX, XLSX supported</p>
            </div>

            {/* DOCUMENT LIST */}
            <div className="space-y-6 mt-8">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="p-6 border border-gray-200">
                  <div className="flex items-start gap-3 mb-4">
                    <FileText className="w-6 h-6 text-indigo-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                      <p className="text-gray-500 text-sm">
                        {doc.date} → {doc.department}
                      </p>
                    </div>
                  </div>

                  {doc.aiSummary && (
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                      <h4 className="font-bold text-gray-800 mb-2">AI Summary</h4>
                      <p className="text-gray-700 mb-3">{doc.aiSummary.title}</p>

                      <ul className="list-disc ml-4 space-y-1">
                        {doc.aiSummary.keyPoints.slice(0, 3).map((p, index) => (
                          <li key={index} className="text-gray-700 text-sm">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="text-sm text-gray-600">Uploaded {doc.uploadedDate}</p>
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
                <p className="font-medium">{act.title}</p>
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
