import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import documentRoutes from "./routes/documentRoutes.js";
import { initGemini } from "./utils/geminiClient.js";
import {
  GEMINI_API_KEY,
  GEMINI_MODEL,
  PORT,
  UPLOAD_FOLDER,
} from "./config/constants.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

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
app.use("/api/v1", documentRoutes);

// Static route to serve uploaded files
app.use("/uploads", express.static(UPLOAD_FOLDER));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
