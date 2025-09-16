const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const documentController = require("../controllers/documentController");

// Main document processing route
router.post(
  "/process-document",
  upload.single("file"),
  documentController.processDocument
);

// Get all documents with filtering and pagination
router.get("/documents", documentController.getDocuments);

// Get single document
router.get("/documents/:id", documentController.getDocumentById);

// Get single document
router.delete("/document/:id", documentController.deleteDocumentById);

// Search documents
router.get("/search", documentController.searchDocuments);

// Get analytics
router.get("/analytics", documentController.getAnalytics);

module.exports = router;
