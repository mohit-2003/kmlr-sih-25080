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

// Get all files
router.get("/files", documentController.getFiles);

module.exports = router;
