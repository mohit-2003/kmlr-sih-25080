import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload folder setup
const UPLOAD_FOLDER = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER);
}

export const PORT = process.env.PORT || 3001;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
export { UPLOAD_FOLDER };
