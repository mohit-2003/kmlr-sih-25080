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

db.run(`
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    upload_time TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// Routes
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("❌ No file uploaded");

  const filename = req.file.filename;

  db.run("INSERT INTO files (filename) VALUES (?)", [filename], function (err) {
    if (err) return res.status(500).send("❌ DB Error");

    res.send(`✅ File '${filename}' uploaded & saved in database!`);
  });
});

app.get("/files", (req, res) => {
  db.all("SELECT * FROM files ORDER BY upload_time DESC", [], (err, rows) => {
    if (err) return res.status(500).send("❌ DB Error");
    res.json(rows);
  });
});

app.get("/files", (req, res) => {
  fs.readdir(UPLOAD_FOLDER, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read files" });
    }
    res.json({ files });
  });
});


// Static route to serve files
app.use("/uploads", express.static(UPLOAD_FOLDER));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});
