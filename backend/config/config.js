const path = require("path");
const fs = require("fs");

// Upload folder setup
const UPLOAD_FOLDER = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER);
}

module.exports = {
  PORT: process.env.PORT || 3001,
  UPLOAD_FOLDER,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: process.env.GEMINI_MODEL || "gemini-2.5-flash",
};
