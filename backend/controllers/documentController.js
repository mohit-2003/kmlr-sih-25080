const documentProcessor = require("../services/documentProcessor");
const pool = require("../config/database");  // PostgreSQL pool
const DocumentModel = require("../models/Document"); // PostgreSQL model

// ---------------------------------------------
// 1. PROCESS DOCUMENT & SAVE TO POSTGRESQL
// ---------------------------------------------
const processDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    const result = await documentProcessor.processDocument(req.file);

    const documentData = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      file_path: req.file.path,
      processing_status: result.processing_status,
      metadata: {
        doc_type: result.data.metadata?.doc_type || "unknown",
        file_size: result.data.metadata?.file_size || req.file.size,
        created_time: result.data.metadata?.created_time || new Date(),
        processed_time: new Date(),
        confidence: result.data.confidence || 0,
        language: result.data.language || "unknown",
        processing_time: result.processing_time || 0,
      },
      extracted_text: result.data.extracted_text || "",
      content_analysis: result.data.content_analysis || {},
      processing_errors: result.errors || [],
    };

    const savedDocument = await DocumentModel.create(documentData);

    res.json({
      ...result,
      document_id: savedDocument.id,
      message: "Document processed and saved successfully",
    });
  } catch (error) {
    console.error("Processing error:", error);
    res.status(500).json({
      success: false,
      error: "Document processing failed",
    });
  }
};

// ---------------------------------------------
// 2. GET DOCUMENTS WITH PAGINATION + FILTERS
// ---------------------------------------------
const getDocuments = async (req, res) => {
  try {
    const { page = 1, limit = 10, department, priority, status, search } = req.query;

    const offset = (page - 1) * limit;

    let query = `SELECT id, filename, originalname, metadata, processing_status, content_analysis, upload_time 
                 FROM documents WHERE 1=1`;
    const values = [];
    let counter = 1;

    if (department) {
      query += ` AND content_analysis->'departments' ? $${counter++}`;
      values.push(department);
    }

    if (priority) {
      query += ` AND content_analysis->>'priority' = $${counter++}`;
      values.push(priority);
    }

    if (status) {
      query += ` AND processing_status->>'overall' = $${counter++}`;
      values.push(status);
    }

    if (search) {
      query += ` AND search_vector @@ plainto_tsquery($${counter++})`;
      values.push(search);
    }

    query += ` ORDER BY upload_time DESC LIMIT $${counter++} OFFSET $${counter}`;
    values.push(limit, offset);

    const documents = await pool.query(query, values);

    const total = await pool.query("SELECT COUNT(*) FROM documents");

    res.json({
      success: true,
      documents: documents.rows,
      pagination: {
        current_page: Number(page),
        total_pages: Math.ceil(total.rows[0].count / limit),
        total_documents: Number(total.rows[0].count),
        has_next: page * limit < total.rows[0].count,
        has_prev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get documents error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch documents",
    });
  }
};

// ---------------------------------------------
// 3. GET DOCUMENT BY ID
// ---------------------------------------------
const getDocumentById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM documents WHERE id = $1",
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
      });
    }

    res.json({
      success: true,
      document: result.rows[0],
    });
  } catch (error) {
    console.error("Get document by ID error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch document",
    });
  }
};

// ---------------------------------------------
// 4. DELETE DOCUMENT BY ID
// ---------------------------------------------
const deleteDocumentById = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM documents WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
      });
    }

    res.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Delete document by ID error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete document",
    });
  }
};

// ---------------------------------------------
// 5. SEARCH DOCUMENTS (FULL TEXT SEARCH)
// ---------------------------------------------
const searchDocuments = async (req, res) => {
  try {
    const { q, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Search query is required",
      });
    }

    const results = await pool.query(
      `SELECT id, filename, originalname, metadata
       FROM documents
       WHERE search_vector @@ plainto_tsquery($1)
       LIMIT $2`,
      [q, limit]
    );

    res.json({
      success: true,
      results: results.rowCount,
      documents: results.rows,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      error: "Search failed",
    });
  }
};

// ---------------------------------------------
// 6. ANALYTICS / DASHBOARD STATS
// ---------------------------------------------
const getAnalytics = async (req, res) => {
  try {
    const analytics = await pool.query(`
      SELECT 
        COUNT(*) AS total_documents,
        SUM(CASE WHEN processing_status->>'overall' = 'success' THEN 1 ELSE 0 END) AS successful_processing,
        SUM(CASE WHEN processing_status->>'overall' = 'failed' THEN 1 ELSE 0 END) AS failed_processing
      FROM documents;
    `);

    const departmentStats = await pool.query(`
      SELECT value AS department, COUNT(*)
      FROM documents, jsonb_array_elements_text(content_analysis->'departments')
      GROUP BY value
      ORDER BY count DESC;
    `);

    const priorityStats = await pool.query(`
      SELECT content_analysis->>'priority' AS priority,
      COUNT(*) 
      FROM documents
      GROUP BY priority;
    `);

    res.json({
      success: true,
      analytics: analytics.rows[0],
      department_distribution: departmentStats.rows,
      priority_distribution: priorityStats.rows,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch analytics",
    });
  }
};

module.exports = {
  processDocument,
  getDocuments,
  getDocumentById,
  deleteDocumentById,
  searchDocuments,
  getAnalytics,
};
