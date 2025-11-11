import Tesseract from "tesseract.js";

/**
 * Extract text from an image or PDF page using OCR.
 *
 * Change this file only if you switch OCR libraries (e.g., to PaddleOCR).
 *
 * @param {string} filePath - path to file (image or pdf page)
 * @param {string} lang - language codes supported by OCR (e.g., "eng+mal")
 * @returns {Promise<{ text: string, confidence: number, method: string }>}
 */
export async function extractText(filePath, lang = "eng") {
  console.log(`🧠 Using OCR (Tesseract) for file: ${filePath}`);

  try {
    const { data } = await Tesseract.recognize(filePath, lang, {
      logger: (m) => {
        if (m.status === "recognizing text") {
          process.stdout.write(
            `OCR Progress: ${Math.round(m.progress * 100)}%\r`
          );
        }
      },
    });

    const text = data.text?.trim() || "";
    const confidence = data.confidence ? data.confidence / 100 : 0.75;

    return {
      text,
      confidence: parseFloat(confidence.toFixed(2)),
      method: "tesseract",
    };
  } catch (err) {
    console.error("❌ OCR extraction failed:", err.message);
    return {
      text: "",
      confidence: 0,
      method: "tesseract",
      error: err.message,
    };
  }
}
