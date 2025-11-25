import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import documentRoutes from "./routes/documentRoutes.js";
import { initLLM } from "./services/llm/llmAdapter.js";

import { PORT, UPLOAD_FOLDER } from "./config/constants.js";

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
try {
  initLLM();
  console.log("Gemini client initialized");
} catch (err) {
  console.error("Gemini init error:", err.message);
}

// Routes
app.use("/api/v1", documentRoutes);

// Static route to serve uploaded files
app.use("/uploads", express.static(UPLOAD_FOLDER));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
