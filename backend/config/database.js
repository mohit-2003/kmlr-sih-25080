const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./files.db", (err) => {
  if (err) console.error("❌ DB Error:", err);
  else console.log("✅ Connected to SQLite DB");
});

// Create tables
db.run(`
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    upload_time TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
