const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize Gemini
const { initGemini } = require("./utils/geminiClient");
const {
  GEMINI_API_KEY,
  GEMINI_MODEL,
  PORT,
  UPLOAD_FOLDER,
} = require("./config/config");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
try {
  initGemini(GEMINI_API_KEY, GEMINI_MODEL);
  console.log("✅ Gemini client initialized");
} catch (err) {
  console.error("❌ Gemini init error:", err.message);
}

// Routes
const documentRoutes = require("./routes/documentRoutes");
app.use("/api", documentRoutes);

// Static route to serve uploaded files
app.use("/uploads", express.static(UPLOAD_FOLDER));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
