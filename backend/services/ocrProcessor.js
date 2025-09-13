const fs = require("fs");
const path = require("path");
const { detectLanguage } = require("./utils");
const { exec } = require("child_process");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

async function process(file) {
  console.log(`🔍 Starting text extraction for: ${file.originalname}`);

  try {
    const fileExtension = path.extname(file.originalname).toLowerCase();

    // Handle different file types
    switch (fileExtension) {
      case ".txt":
        return await processTextFile(file);
      case ".pdf":
        return await processPDFFile(file);
      case ".jpg":
      case ".jpeg":
      case ".png":
      case ".gif":
      case ".bmp":
      case ".tiff":
      case ".webp":
        return await processImageFile(file);
      case ".docx":
        return await processWordFile(file);
      default:
        // Try to read as text first, then fallback to OCR
        return await processUnknownFile(file);
    }
  } catch (error) {
    console.error("❌ Text extraction failed:", error);

    return {
      text: "",
      confidence: 0,
      language: "unknown",
      word_count: 0,
      character_count: 0,
      error: `Text extraction failed: ${error.message}`,
    };
  }
}

// Process plain text files
async function processTextFile(file) {
  try {
    console.log("📄 Reading plain text file...");

    const text = fs.readFileSync(file.path, "utf8");
    const cleanedText = cleanExtractedText(text);
    const detectedLanguage = detectLanguage(cleanedText);

    console.log(
      `✅ Text file read successfully - ${cleanedText.length} characters`
    );

    return {
      text: cleanedText,
      confidence: 1.0, // Perfect confidence for plain text
      language: detectedLanguage,
      word_count: cleanedText.split(/\s+/).filter((word) => word.length > 0)
        .length,
      character_count: cleanedText.length,
      method: "direct_read",
    };
  } catch (error) {
    throw new Error(`Failed to read text file: ${error.message}`);
  }
}

// Process image files with OCR
async function processImageFile(file) {
  try {
    console.log("🖼️ Processing image with OCR...");

    const { data } = await Tesseract.recognize(file.path, "eng+mal", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
        }
      },
    });

    const extractedText = data.text.trim();
    const confidence = data.confidence / 100;
    const detectedLanguage = detectLanguage(extractedText);
    const cleanedText = cleanExtractedText(extractedText);

    console.log(
      `✅ OCR completed - Confidence: ${Math.round(confidence * 100)}%`
    );

    return {
      text: cleanedText,
      confidence: parseFloat(confidence.toFixed(2)),
      language: detectedLanguage,
      word_count: cleanedText.split(/\s+/).filter((word) => word.length > 0)
        .length,
      character_count: cleanedText.length,
      method: "ocr",
    };
  } catch (error) {
    throw new Error(`OCR processing failed: ${error.message}`);
  }
}

// Process PDF files - OCR
async function processPDFFile(file) {
  try {
    const filepath = file.path;
    console.log("📄 Processing PDF file...");
    let rawText = "";

    // Try pdf-parse first
    const dataBuffer = fs.readFileSync(filepath);
    const pdfData = await pdfParse(dataBuffer);
    if (pdfData.text && pdfData.text.trim().length > 0) {
      rawText = pdfData.text;
    }

    // If pdf-parse fails, try pdftotext (Poppler)
    if (!rawText) {
      const txtFile = filepath.replace(/\.pdf$/, ".txt");
      await new Promise((resolve, reject) => {
        exec(`pdftotext "${filepath}" "${txtFile}"`, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      const textFromFile = fs.readFileSync(txtFile, "utf8");
      if (textFromFile && textFromFile.trim().length > 0) {
        rawText = textFromFile;
      }
    }

    // If still no text, fallback to Tesseract OCR
    if (!rawText) {
      const {
        data: { text },
      } = await Tesseract.recognize(filepath, "eng", {
        logger: (m) => console.log("Tesseract:", m.status),
      });
      rawText = text;
    }

    // Process extracted text
    const cleanedText = cleanExtractedText(rawText);
    const detectedLanguage = detectLanguage(cleanedText);

    console.log(
      `✅ Text file read successfully - ${cleanedText.length} characters`
    );

    return {
      text: cleanedText,
      confidence: rawText ? 1.0 : 0.7, // adjust if OCR
      language: detectedLanguage,
      word_count: cleanedText.split(/\s+/).filter((w) => w.length > 0).length,
      character_count: cleanedText.length,
    };
  } catch (err) {
    console.error("❌ Text extraction error:", err);
    throw err;
  }
}

// Process Word documents (basic text extraction)
async function processWordFile(file) {
  try {
    console.log("📝 Processing Word document...");

    // For .docx files, you'd typically use a library like mammoth
    // For now, we'll return an error suggesting manual conversion
    throw new Error(
      "Word document processing not implemented. Please convert to PDF or text format."
    );
  } catch (error) {
    throw new Error(`Word document processing failed: ${error.message}`);
  }
}

// Try to process unknown file types
async function processUnknownFile(file) {
  try {
    console.log("❓ Attempting to read unknown file type as text...");

    // First try reading as text
    const text = fs.readFileSync(file.path, "utf8");

    // Check if it looks like readable text
    if (isReadableText(text)) {
      const cleanedText = cleanExtractedText(text);
      const detectedLanguage = detectLanguage(cleanedText);

      console.log("✅ Successfully read unknown file as text");

      return {
        text: cleanedText,
        confidence: 0.9, // High but not perfect confidence
        language: detectedLanguage,
        word_count: cleanedText.split(/\s+/).filter((word) => word.length > 0)
          .length,
        character_count: cleanedText.length,
        method: "text_fallback",
      };
    } else {
      throw new Error("File does not contain readable text");
    }
  } catch (error) {
    throw new Error(`Unknown file type processing failed: ${error.message}`);
  }
}

// Check if text is readable (not binary)
function isReadableText(text) {
  if (!text || text.length === 0) return false;

  // Check for binary content (too many non-printable characters)
  const nonPrintable = text.match(/[\x00-\x08\x0E-\x1F\x7F-\xFF]/g);
  const nonPrintableRatio = nonPrintable
    ? nonPrintable.length / text.length
    : 0;

  // If more than 30% non-printable characters, probably binary
  return nonPrintableRatio < 0.3;
}

// Clean and improve extracted text
function cleanExtractedText(text) {
  if (!text || text.length === 0) return "";

  return (
    text
      // Normalize line endings
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      // Remove excessive whitespace
      .replace(/[ \t]+/g, " ")
      // Remove excessive line breaks (more than 2)
      .replace(/\n{3,}/g, "\n\n")
      // Remove weird characters that often come from OCR
      .replace(/[^\w\s\u0D00-\u0D7F.,!?:;()\-'"@#$%&*+=<>/\\|\[\]{}~`\n]/g, " ")
      // Clean up spacing around punctuation
      .replace(/\s+([,.!?;:])/g, "$1")
      .replace(/([,.!?;:])\s*/g, "$1 ")
      // Trim and clean
      .trim()
  );
}

// Get supported file types
function getSupportedFileTypes() {
  return {
    text_files: [".txt"],
    image_files: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp"],
    pdf_files: [".pdf"],
    document_files: [".docx"], // Limited support
    notes: {
      text_files: "Direct text extraction",
      image_files: "OCR processing required",
      pdf_files: "PDF to image conversion + OCR processing",
      document_files: "Limited support - convert to PDF recommended",
    },
  };
}

module.exports = {
  process,
  getSupportedFileTypes,
};
