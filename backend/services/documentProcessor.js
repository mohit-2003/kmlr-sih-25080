import ocrService from "./ocr/index.js";
import { analyzeDocument } from "./llm/documentAnalyzer.js";
import Document from "../models/Document.js";
import fs from "fs";

/**
 * Background Pipeline.
 * Updates the database after every step.
 */
async function processDocument(docId, file) {
  console.log(`⚙️ Pipeline Started for Doc ID: ${docId}`);

  try {
    // -----------------------------
    // Step 2: OCR Processing
    // -----------------------------
    await Document.update(
      { status: "PROCESSING_OCR" },
      { where: { id: docId } }
    );
    console.log("🔍 [Step 2] Running OCR service...");

    const ocrResult = await ocrService(file);
    const extractedText = ocrResult.text || "";

    // Validation
    if (!extractedText.trim()) {
      await Document.update(
        {
          status: "UNREADABLE",
          error_message: "OCR finished but no text found.",
          error_stage: "ocr",
        },
        { where: { id: docId } }
      );
      return; // Stop pipeline
    }

    // SAVE OCR RESULTS TO DB
    await Document.update(
      {
        raw_text: extractedText,
        language_detected: ocrResult.language || "unknown",
        ocr_confidence: ocrResult.confidence || 0,
        status: "SUMMARIZING", // Mark Step 2 complete, moving to LLM
      },
      { where: { id: docId } }
    );

    console.log("✅ OCR text saved to DB.");

    // -----------------------------
    // Step 3: LLM Analysis
    // -----------------------------
    console.log("🤖 [Step 3] Running AI analysis...");
    const analysis = await analyzeDocument(extractedText);

    // SAVE FINAL RESULTS TO DB
    await Document.update(
      {
        status: "COMPLETED",
        completed_at: Date.now(),

        // AI Fields
        priority: analysis.priority || "NORMAL",
        short_summary_en: analysis.short_summary_en || "",
        short_summary_ml: analysis.short_summary_ml || "",

        detailed_summary_en: Array.isArray(analysis.detailed_summary_en)
          ? analysis.detailed_summary_en
          : [analysis.detailed_summary_en || ""],
        detailed_summary_ml: Array.isArray(analysis.detailed_summary_ml)
          ? analysis.detailed_summary_ml
          : [analysis.detailed_summary_ml || ""],

        action_items: analysis.action_items || [],
        tags: analysis.key_entities || [],
        assigned_departments: analysis.assigned_departments || [],
        routed_at: analysis.routed_at || null,

        // Save token usage if available
        llm_metadata: analysis.usage_metadata || {},
      },
      { where: { id: docId } }
    );

    console.log(`🎉 Pipeline successfully completed for Doc ID: ${docId}`);
  } catch (error) {
    console.error(`❌ Pipeline failed for Doc ID: ${docId}`, error);

    // Update DB with Failure
    await Document.update(
      {
        status: "FAILED",
        error_message: error.message,
        error_stage: "background_processing",
      },
      { where: { id: docId } }
    );
  } finally {
    // Cleanup local file
    try {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    } catch (e) {
      /* ignore */
    }
  }
}

export default processDocument;
