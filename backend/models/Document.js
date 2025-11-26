const pool = require("../config/database");

exports.create = async (data) => {
  const result = await pool.query(
    `INSERT INTO documents 
     (filename, originalname, file_path, processing_status, metadata, extracted_text, content_analysis, processing_errors) 
     VALUES($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [
      data.filename,
      data.originalname,
      data.file_path,
      data.processing_status,
      data.metadata,
      data.extracted_text,
      data.content_analysis,
      data.processing_errors
    ]
  );

  return result.rows[0];
};
