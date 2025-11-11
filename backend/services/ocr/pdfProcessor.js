import fs from "fs";
import { exec } from "child_process";
import PdfParse from "pdf-parse";
import { extractText } from "./ocrEngine.js";
import { detectLanguage } from "../utils.js";
import { cleanExtractedText } from "./utils.js";

/**
 * Process PDF files - handles both digital and scanned PDFs.
 * Uses multiple fallback layers: pdf-parse → pdftotext → OCR (via ocrEngine)
 */
async function processPDFFile(file) {
  const filepath = file.path;
  console.log(`📄 Processing PDF: ${file.originalname}`);

  let rawText = "";
  let usedMethod = "pdf_parse";
  let confidence = 1.0;

  try {
    // 🧩 STEP 1: Try pdf-parse (digital PDFs with embedded text)
    const dataBuffer = fs.readFileSync(filepath);
    const pdfData = await PdfParse(dataBuffer);

    if (pdfData.text && pdfData.text.trim().length > 0) {
      rawText = pdfData.text.trim();
      usedMethod = "pdf_parse";
    }

    // 🧩 STEP 2: Fallback to Poppler's pdftotext (if text layer not found)
    if (!rawText) {
      console.log("⚙️ Trying pdftotext fallback...");
      const txtFile = filepath.replace(/\.pdf$/, ".txt");

      await new Promise((resolve, reject) => {
        exec(`pdftotext "${filepath}" "${txtFile}"`, (err) =>
          err ? reject(err) : resolve()
        );
      });

      const textFromFile = fs.readFileSync(txtFile, "utf8");
      if (textFromFile && textFromFile.trim().length > 0) {
        rawText = textFromFile.trim();
        usedMethod = "pdftotext";
      }
    }

    // 🧩 STEP 3: Fallback to OCR (for scanned PDFs)
    if (!rawText) {
      console.log("🧠 Falling back to OCR engine for scanned PDF...");
      const {
        text,
        confidence: ocrConfidence,
        method,
      } = await extractText(filepath, "eng+mal");
      rawText = text;
      confidence = ocrConfidence;
      usedMethod = method;
    }

    // 🧹 STEP 4: Post-process the extracted text
    const cleanedText = cleanExtractedText(rawText);
    const detectedLanguage = detectLanguage(cleanedText);

    console.log(
      `✅ PDF processed successfully via ${usedMethod} (${cleanedText.length} chars)`
    );

    return {
      text: cleanedText,
      confidence: parseFloat(confidence.toFixed(2)),
      language: detectedLanguage,
      word_count: cleanedText.split(/\s+/).filter(Boolean).length,
      character_count: cleanedText.length,
      method: usedMethod,
    };
  } catch (error) {
    console.error("❌ PDF text extraction failed:", error);
    throw new Error(`PDF processing failed: ${error.message}`);
  }
}

export default processPDFFile;
