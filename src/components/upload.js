import React, { useState, useRef } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [tokens, setTokens] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage("");
      setTokens([]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setMessage("");
      setTokens([]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file first!");
      return;
    }

    setIsUploading(true);
    setMessage("⏳ Uploading...");
    setTokens([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", { method: "POST", body: formData })


      const data = await response.text();
      setMessage("✅ " + data);

      // 🔑 Basic tokenization (split on spaces, remove empty)
      const wordTokens = data.split(/\s+/).filter(Boolean);
      setTokens(wordTokens);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setMessage("");
    setTokens([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>File Upload</h2>
        <p style={styles.subtitle}>Select a file to upload to the server</p>

        {/* Drop Zone */}
        <div
          style={{
            ...styles.dropZone,
            ...(isDragging ? styles.dropZoneDragging : {}),
            ...(file ? styles.dropZoneHasFile : {}),
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={styles.hiddenInput}
          />
          <div style={styles.dropZoneContent}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={styles.uploadIcon}
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p style={styles.dropZoneText}>
              {file
                ? file.name
                : "Drag & drop your file here or click to browse"}
            </p>
            {file && <p style={styles.fileSize}>{formatFileSize(file.size)}</p>}
          </div>
        </div>

        {/* Remove Button */}
        {file && (
          <div style={styles.fileActions}>
            <button
              onClick={handleRemoveFile}
              style={styles.removeButton}
              disabled={isUploading}
            >
              Remove File
            </button>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          style={{
            ...styles.uploadButton,
            ...((!file || isUploading) ? styles.uploadButtonDisabled : {}),
          }}
        >
          {isUploading ? (
            <>
              <span style={styles.spinner}></span>
              Uploading...
            </>
          ) : (
            "Upload File"
          )}
        </button>

        {/* Server Response */}
        {message && (
          <div style={styles.messageContainer}>
            <h3 style={styles.messageTitle}>Server Response:</h3>
            <div
              style={{
                ...styles.message,
                ...(message.startsWith("✅") ? styles.messageSuccess : {}),
                ...(message.startsWith("❌") ? styles.messageError : {}),
              }}
            >
              {message}
            </div>
          </div>
        )}

        {/* Token Display */}
        {tokens.length > 0 && (
          <div style={styles.tokensContainer}>
            <h3 style={styles.messageTitle}>Extracted Tokens:</h3>
            <div style={styles.tokensBox}>
              {tokens.map((token, idx) => (
                <span key={idx} style={styles.tokenChip}>
                  {token}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Complete styles object
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center"
  },
  title: {
    margin: "0 0 8px 0",
    color: "#333",
    fontSize: "24px"
  },
  subtitle: {
    margin: "0 0 24px 0",
    color: "#666",
    fontSize: "14px"
  },
  dropZone: {
    border: "2px dashed #ccc",
    borderRadius: "8px",
    padding: "30px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginBottom: "16px"
  },
  dropZoneDragging: {
    borderColor: "#3182ce",
    backgroundColor: "rgba(49, 130, 206, 0.1)"
  },
  dropZoneHasFile: {
    borderColor: "#38a169",
    backgroundColor: "rgba(56, 161, 105, 0.1)"
  },
  hiddenInput: {
    display: "none"
  },
  dropZoneContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px"
  },
  uploadIcon: {
    color: "#718096"
  },
  dropZoneText: {
    margin: "0",
    color: "#4a5568",
    fontSize: "16px"
  },
  fileSize: {
    margin: "0",
    color: "#718096",
    fontSize: "14px"
  },
  fileActions: {
    marginBottom: "16px"
  },
  removeButton: {
    backgroundColor: "transparent",
    color: "#e53e3e",
    border: "1px solid #e53e3e",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease"
  },
  uploadButton: {
    backgroundColor: "#3182ce",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "12px 24px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease"
  },
  uploadButtonDisabled: {
    backgroundColor: "#cbd5e0",
    cursor: "not-allowed"
  },
  spinner: {
    display: "inline-block",
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderRadius: "50%",
    borderTopColor: "#fff",
    animation: "spin 1s ease-in-out infinite"
  },
  messageContainer: {
    marginTop: "20px",
    textAlign: "left"
  },
  messageTitle: {
    margin: "0 0 8px 0",
    fontSize: "16px",
    color: "#2d3748"
  },
  message: {
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: "#f7fafc",
    border: "1px solid #e2e8f0",
    fontSize: "14px"
  },
  messageSuccess: {
    backgroundColor: "#f0fff4",
    borderColor: "#9ae6b4",
    color: "#2f855a"
  },
  messageError: {
    backgroundColor: "#fff5f5",
    borderColor: "#feb2b2",
    color: "#c53030"
  },
  tokensContainer: {
    marginTop: "20px",
    textAlign: "left"
  },
  tokensBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "10px"
  },
  tokenChip: {
    backgroundColor: "#3182ce",
    color: "white",
    padding: "4px 10px",
    borderRadius: "16px",
    fontSize: "13px",
    fontWeight: "500"
  }
};

// Add spinner animation to the document
if (typeof document !== 'undefined' && document.styleSheets.length > 0) {
  const styleSheet = document.styleSheets[0];
  try {
    styleSheet.insertRule(`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `, styleSheet.cssRules.length);
  } catch (e) {
    // Fallback if CSS injection fails
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

export default Upload;