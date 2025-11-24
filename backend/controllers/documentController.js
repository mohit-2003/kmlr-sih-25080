import documentProcessor from "../services/documentProcessor.js";
import Document from "../models/Document.js";
import { Op, fn, col, literal } from "sequelize";

/**
 * POST /api/documents/process
 * Upload and process a document (OCR + summarization + classification)
 */
export const processDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    console.log(`📄 Processing uploaded document: ${req.file.originalname}`);

    // Step 1: Run OCR & AI pipeline
    const result = await documentProcessor(req.file);

    // Step 2: Store to DB
    const newDoc = await Document.create({
      file_name: req.file.originalname,
      file_type: req.file.mimetype || "pdf",
      storage_url: result.data.file_url,
      uploaded_by: req.user?.id || 0,
      file_size: req.file.size,
      priority: result.data.priority || "NORMAL",
      status:
      result.processing_status?.overall === "success"
      ? "COMPLETED"
      : result.processing_status?.overall === "failed"
      ? "FAILED"
      : "PREPROCESSED",
      error_stage: result.errors?.[0]?.stage || null,
      error_message: result.errors?.[0]?.message || null,
      language_detected: result.data.language || "unknown",
      raw_text: result.data.extracted_text || "",
      short_summary_en: result.data.short_summary_en || "",
      short_summary_ml: result.data.short_summary_ml || "",
      detailed_summary_en: result.data.detailed_summary_en || "",
      detailed_summary_ml: result.data.detailed_summary_ml || "",
      action_items: result.data.action_items || [],
      tags: result.data.tags || [],
      assigned_departments: result.data.assigned_departments || [],
      routed_at: result.data.routed_at || null,
      completed_at: result.data.completed_at || null,
    });

    console.log(`Document saved successfully (ID: ${newDoc.id})`);

    return res.json({
      success: true,
      document_id: newDoc.id,
      message: "Document processed and saved successfully",
      data: result.data,
    });
  } catch (error) {
    console.error("Document processing failed:", error);
    res.status(500).json({
      success: false,
      error: "Document processing failed",
      details: error.message,
    });
  }
};

/**
 * GET /api/documents
 * Paginated list of documents with filters
 */
export const getDocuments = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      department,
      priority,
      status,
      search,
    } = req.query;

    const where = {};

    if (department) {
      where.assigned_departments = { [Op.contains]: [department] }; // ARRAY contains
    }

    if (priority) {
      where.priority = priority.toUpperCase();
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    if (search) {
      where[Op.or] = [
        { file_name: { [Op.iLike]: `%${search}%` } },
        { short_summary_en: { [Op.iLike]: `%${search}%` } },
        { detailed_summary_en: { [Op.iLike]: `%${search}%` } },
        { tags: { [Op.overlap]: [search] } },
      ];
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await Document.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset,
      attributes: { exclude: ["raw_text"] },
    });

    res.json({
      success: true,
      documents: rows,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(count / limit),
        total_documents: count,
        has_next: page * limit < count,
        has_prev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get documents failed:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch documents",
    });
  }
};

/**
 * GET /api/documents/:id
 */
export const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findByPk(req.params.id);

    if (!doc) {
      return res
        .status(404)
        .json({ success: false, error: "Document not found" });
    }

    res.json({ success: true, document: doc });
  } catch (error) {
    console.error("Get document by ID failed:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch document",
    });
  }
};

/**
 * DELETE /api/documents/:id
 */
export const deleteDocumentById = async (req, res) => {
  try {
    const deleted = await Document.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: "Document not found" });
    }

    res.json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    console.error("Delete document failed:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete document",
    });
  }
};

/**
 * GET /api/documents/search?q=
 * Full-text search + filters
 */
export const searchDocuments = async (req, res) => {
  try {
    const { q, department, priority, limit = 20 } = req.query;
    if (!q)
      return res
        .status(400)
        .json({ success: false, error: "Search query required" });

    const where = {
      [Op.or]: [
        { file_name: { [Op.iLike]: `%${q}%` } },
        { short_summary_en: { [Op.iLike]: `%${q}%` } },
        { detailed_summary_en: { [Op.iLike]: `%${q}%` } },
        { tags: { [Op.overlap]: [q] } },
      ],
    };

    if (department)
      where.assigned_departments = { [Op.contains]: [department] };
    if (priority) where.priority = priority.toUpperCase();

    const results = await Document.findAll({
      where,
      limit: parseInt(limit),
      order: [["updatedAt", "DESC"]],
      attributes: { exclude: ["raw_text"] },
    });

    res.json({
      success: true,
      query: q,
      results: results.length,
      documents: results,
    });
  } catch (error) {
    console.error("Search failed:", error);
    res.status(500).json({
      success: false,
      error: "Search failed",
    });
  }
};

/**
 * GET /api/documents/analytics
 */
export const getAnalytics = async (req, res) => {
  try {
    const totalDocs = await Document.count();

    const statusCounts = await Document.findAll({
      attributes: ["status", [fn("COUNT", col("status")), "count"]],
      group: ["status"],
    });

    const priorityCounts = await Document.findAll({
      attributes: ["priority", [fn("COUNT", col("priority")), "count"]],
      group: ["priority"],
    });

    const deptCounts = await Document.findAll({
      attributes: [
        [literal("unnest(assigned_departments)"), "department"],
        [fn("COUNT", literal("unnest(assigned_departments)")), "count"],
      ],
      group: ["department"],
    });

    res.json({
      success: true,
      analytics: {
        total_documents: totalDocs,
        status_distribution: statusCounts,
        priority_distribution: priorityCounts,
        department_distribution: deptCounts,
      },
    });
  } catch (error) {
    console.error("Analytics failed:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch analytics",
    });
  }
};
