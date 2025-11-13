import metadataExtractor from "./metadataExtractor.js";
import ocrService from "./ocr/index.js";
import { analyzeDocument } from "./llm/documentAnalyzer.js";

/**
 * Main document processing pipeline
 * (full pipeline kept — only metadata + OCR steps improved)
 */
async function processDocument(file) {
  const startTime = Date.now();

  const result = {
    success: true,
    processing_status: {
      metadata: "pending",
      ocr: "pending",
      llm_analysis: "pending",
      overall: "pending",
    },
    data: {},
    errors: [],
  };

  // -----------------------------
  // Step 1: Metadata Extraction
  // -----------------------------
  try {
    console.log("📊 [Step 1] Extracting metadata...");

    const metadata = await metadataExtractor.extract(file);
    result.data.metadata = metadata;

    result.processing_status.metadata = "success";
    console.log("✅ Metadata extracted:", {
      file_name: metadata.file_name,
      file_size: metadata.file_size,
      mime_type: metadata.mime_type,
    });
  } catch (error) {
    console.error("❌ Metadata extraction failed:", error);

    result.processing_status.metadata = "failed";
    result.errors.push({
      stage: "metadata",
      message: error.message,
      stack: error.stack || null,
    });

    // Optional: stop pipeline early if metadata is essential
    return finalizeResult(result, startTime);
  }

  // -----------------------------
  // Step 2: OCR Processing
  // -----------------------------
  try {
    console.log("🔍 [Step 2] Running OCR service...");

    const ocrResult = await ocrService(file);

    result.data.extracted_text = ocrResult.text || "";
    result.data.confidence = ocrResult.confidence || 0;
    result.data.language = ocrResult.language || "unknown";
    result.data.ocr_method = ocrResult.method || "unknown";

    result.processing_status.ocr = "success";
    console.log(
      `✅ OCR completed (${Math.round(
        (ocrResult.confidence || 0) * 100
      )}% confidence, Lang: ${ocrResult.language})`
    );
  } catch (error) {
    console.error("❌ OCR processing failed:", error);

    result.processing_status.ocr = "failed";
    result.errors.push({
      stage: "ocr",
      message: error.message,
      stack: error.stack || null,
    });
  }

  // -----------------------------
  // Step 3: LLM Analysis
  // -----------------------------
  try {
    if (result.data.extracted_text?.trim()) {
      console.log("🤖 [Step 3] Running AI analysis...");
      result.data.content_analysis = await analyzeDocument(
        result.data.extracted_text
      );

      result.processing_status.llm_analysis = "success";
      console.log("AI analysis completed");
    } else {
      result.processing_status.llm_analysis = "skipped";
      result.errors.push({
        stage: "llm_analysis",
        message: "No extracted text available for AI analysis",
      });
    }
  } catch (error) {
    console.error("❌ LLM analysis failed:", error);

    result.processing_status.llm_analysis = "failed";
    result.errors.push({
      stage: "llm_analysis",
      message: error.message,
      stack: error.stack,
    });
  }

  return finalizeResult(result, startTime);
}

/**
 * Helper: finalizes result object
 */
function finalizeResult(result, startTime) {
  const duration = (Date.now() - startTime) / 1000;
  const hasErrors = result.errors.length > 0;
  const anySuccess = Object.values(result.processing_status).includes(
    "success"
  );

  result.processing_status.overall = hasErrors
    ? anySuccess
      ? "partial_success"
      : "failed"
    : "success";

  result.processing_time = duration;
  return result;
}

export default processDocument;
