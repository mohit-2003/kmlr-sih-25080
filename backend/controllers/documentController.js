const documentProcessor = require("../services/documentProcessor");
const db = require("../config/database");

// Main document processing endpoint
const processDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    // Process the document through our pipeline
    const result = await documentProcessor.processDocument(req.file);

    // Save to database
    const filename = req.file.filename;
    db.run(
      "INSERT INTO files (filename) VALUES (?)",
      [filename],
      function (err) {
        if (err) console.error("DB Error:", err);
      }
    );

    res.json(result);
  } catch (error) {
    console.error("Processing error:", error);
    res.status(500).json({
      success: false,
      error: "Document processing failed",
    });
  }
};

// Get all files
const getFiles = (req, res) => {
  db.all("SELECT * FROM files ORDER BY upload_time DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: "DB Error" });
    res.json({ success: true, files: rows });
  });
};

module.exports = {
  processDocument,
  getFiles,
};
