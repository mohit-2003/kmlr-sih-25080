const express = require("express");
const cors = require("cors");
const multer = require("multer");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Upload folder
const UPLOAD_FOLDER = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER);
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Database setup
const db = new sqlite3.Database("./files.db", (err) => {
  if (err) console.error("❌ DB Error:", err);
  else console.log("✅ Connected to SQLite DB");
});

// Create table (extended schema with metadata)
db.run(`
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    title TEXT,
    department TEXT,
    summary TEXT,
    tags TEXT,
    type TEXT,
    priority TEXT,
    language TEXT DEFAULT 'English',
    file_size INTEGER,
    upload_time TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// 📌 Upload route (file + metadata)
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("❌ No file uploaded");

  const { title, department, summary, tags, type, priority, language } = req.body;

  db.run(
    `INSERT INTO files 
      (filename, title, department, summary, tags, type, priority, language, file_size) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.file.filename,
      title || null,
      department || null,
      summary || null,
      tags || null,
      type || null,
      priority || null,
      language || "English",
      req.file.size,
    ],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("❌ DB Error");
      }
      res.json({ id: this.lastID, filename: req.file.filename });
    }
  );
});

// 📌 List all files
app.get("/files", (req, res) => {
  db.all("SELECT * FROM files ORDER BY upload_time DESC", [], (err, rows) => {
    if (err) return res.status(500).send("❌ DB Error");
    res.json(rows);
  });
});

// 📌 Search endpoint
app.get("/search", (req, res) => {
  const q = `%${req.query.q || ""}%`;
  db.all(
    `SELECT * FROM files 
     WHERE title LIKE ? 
        OR department LIKE ? 
        OR tags LIKE ? 
        OR summary LIKE ? 
     ORDER BY upload_time DESC`,
    [q, q, q, q],
    (err, rows) => {
      if (err) return res.status(500).send("❌ DB Error");
      res.json(rows);
    }
  );
});

// 📌 Serve uploaded files statically
app.use("/uploads", express.static(UPLOAD_FOLDER));

// 🚀 Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});
