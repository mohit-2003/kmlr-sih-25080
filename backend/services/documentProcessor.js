const metadataExtractor = require("./metadataExtractor");
const ocrProcessor = require("./ocrProcessor");
const geminiService = require("./geminiService");

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

  try {
    // Step 1: Extract basic metadata
    console.log("📊 Extracting metadata...");
    result.data.metadata = await metadataExtractor.extract(file);
    result.processing_status.metadata = "success";
    console.log("✅ Metadata extracted");
  } catch (error) {
    console.error("❌ Metadata extraction failed:", error);
    result.processing_status.metadata = "failed";
    result.errors.push("Metadata extraction failed");
  }

  try {
    // Step 2: OCR Processing
    console.log("🔍 Processing OCR...");
    const ocrResult = await ocrProcessor.process(file);
    result.data.extracted_text = ocrResult.text;
    result.data.confidence = ocrResult.confidence;
    result.data.language = ocrResult.language;
    result.processing_status.ocr = "success";
    console.log("✅ OCR completed");
  } catch (error) {
    console.error("❌ OCR processing failed:", error);
    result.processing_status.ocr = "failed";
    result.errors.push("OCR processing failed");
  }

  try {
    // Step 3: LLM Analysis (only if we have text)
    if (result.data.extracted_text) {
      console.log("🤖 Running AI analysis...");
      result.data.content_analysis = await geminiService.analyzeDocument(
        result.data.extracted_text
      );
      result.processing_status.llm_analysis = "success";
      console.log("✅ AI analysis completed");
    } else {
      result.processing_status.llm_analysis = "skipped";
      result.errors.push("No text available for AI analysis");
    }
  } catch (error) {
    console.error("❌ LLM analysis failed:", error);
    result.processing_status.llm_analysis = "failed";
    result.errors.push("AI analysis failed");
  }

  // Final status
  const hasErrors = result.errors.length > 0;
  const hasSuccesses = Object.values(result.processing_status).some(
    (status) => status === "success"
  );

  result.processing_status.overall = hasErrors
    ? hasSuccesses
      ? "partial_success"
      : "failed"
    : "success";
  result.processing_time = (Date.now() - startTime) / 1000;

  return result;
}

module.exports = {
  processDocument,
};
