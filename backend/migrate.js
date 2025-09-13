const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./files.db");

const migrations = [
  "ALTER TABLE files ADD COLUMN title TEXT",
  "ALTER TABLE files ADD COLUMN type TEXT",
  "ALTER TABLE files ADD COLUMN department TEXT",
  "ALTER TABLE files ADD COLUMN summary TEXT",
  "ALTER TABLE files ADD COLUMN key_points TEXT",
  "ALTER TABLE files ADD COLUMN tags TEXT",
  "ALTER TABLE files ADD COLUMN file_size REAL",
  "ALTER TABLE files ADD COLUMN language TEXT",
  "ALTER TABLE files ADD COLUMN priority TEXT",
  "ALTER TABLE files ADD COLUMN ai_confidence INTEGER",
];

migrations.forEach((sql) => {
  db.run(sql, (err) => {
    if (err && !err.message.includes("duplicate column")) {
      console.error("❌ Migration error:", err.message);
    } else {
      console.log("✅", sql);
    }
  });
});
