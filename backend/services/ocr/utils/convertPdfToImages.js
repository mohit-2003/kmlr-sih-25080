// utils/convertPdfToImages.js
import fs from "fs";
import path from "path";
import pdfPoppler from "pdf-poppler";

/**
 * Converts a PDF into image files (PNG) using the bundled Poppler binary.
 * Fast and works on Windows without external installation.
 *
 * @param {string} pdfPath - Full path of the PDF file to convert
 * @returns {Promise<string[]>} - Array of paths to PNG image files
 */
export default async function convertPdfToImages(pdfPath) {
  const outputDir = path.dirname(pdfPath);
  const baseName = path.basename(pdfPath, path.extname(pdfPath));

  const options = {
    format: "png",
    scale: 2048, // High resolution for better OCR accuracy
    out_dir: outputDir,
    out_prefix: `page-${baseName}`, // Unique prefix prevents overwriting
    page: null, // Convert all pages
  };

  console.log(`🔄 Converting PDF to images`);

  try {
    await pdfPoppler.convert(pdfPath, options);
  } catch (err) {
    throw new Error(`PDF conversion failed: ${err.message}`);
  }

  // Collect generated images from output directory
  // Logic updated to match the specific prefix we just set
  const images = fs
    .readdirSync(outputDir)
    .filter(
      (file) => file.startsWith(`page-${baseName}`) && file.endsWith(".png")
    )
    .map((file) => path.join(outputDir, file));

  console.log(`🖼 Converted pages: ${images.length}`);
  return images;
}
