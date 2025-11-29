import documentProcessor from "../services/documentProcessor.js";
import Document from "../models/Document.js";
import { Op, fn, col, literal } from "sequelize";
import { ALLOWED_FILE_EXTENSIONS } from "../services/utils.js";
import metadataExtractor from "../services/metadataExtractor.js";
// FIX: Added S3 upload integration to enable saving files to AWS before processing
import uploadToS3 from "../services/s3Uploader.js";

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

    // ===== File type validation =====
    const fileExt = req.file.originalname
      .toLowerCase()
      .substring(req.file.originalname.lastIndexOf("."));

    if (!ALLOWED_FILE_EXTENSIONS.includes(fileExt)) {
      return res.status(400).json({
        success: false,
        error: "Invalid file type. Allowed types: pdf, word, txt, images",
      });
    }

    const employeeId = req.body.employeeId
      ? parseInt(req.body.employeeId)
      : null;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        error: "Missing employeeId in form data",
      });
    }

    console.log(`📄 Processing uploaded document: ${req.file.originalname}`);
    //  STEP 0 — Upload file to S3
    // FIX: Introduced S3 upload step to ensure documents are stored and retrievable.
    // Without this, storage_url remained empty and frontend couldn't display files.
    console.log("📤 Uploading file to S3...");
    const s3Result = await uploadToS3(req.file);

    // FIX: Attach S3 file URL to request object so it can be saved in the database.
    req.file.url = s3Result.url;
    console.log("✔ File uploaded to S3:", req.file.url);

    // 1. Extract Metadata
    console.log("📊 [Step 1] Extracting metadata...");
    const metadata = await metadataExtractor.extract(req.file);

    // 2. Create DB Record (Status: UPLOADED)
    const newDoc = await Document.create({
      storage_url: req.file.url,
      uploaded_by: employeeId,
      status: "UPLOADED",
      ...metadata,
    });

    console.log(
      `✅ Document ID ${newDoc.id} created. Triggering background processor.`
    );

    // 3. Trigger Background Processing (Fire & Forget)
    // We pass the ID so the processor knows which record to update.
    documentProcessor(newDoc.id, req.file).catch((err) => {
      console.error(`Background worker failed for ID ${newDoc.id}`, err);
    });

    // 4. Return Immediate Response
    return res.status(202).json({
      success: true,
      document_id: newDoc.id,
      message: "File uploaded. Processing started in background.",
      status: "UPLOADED",
    });
  } catch (error) {
    console.error("Document upload failed:", error);
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
        { detailed_summary_en: { [Op.overlap]: [search] } }, //=>using iLike would have caused crash as it is an array
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
    const doc = await Document.findByPk(req.params.id, {
      attributes: { exclude: ["raw_text"] },
    });

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

    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Search query required",
      });
    }

    // CHANGE #1 — Normalize search term for ARRAY operations
    // Postgres ARRAY operators require an array value.
    // So we convert "q" → ["q"] for overlap / contains.
    const arr = [q];

    // CHANGE #2 — ARRAY SAFE SEARCH LOGIC
    // Your previous code used ILIKE on array columns (BAD)
    // Example: detailed_summary_en ILIKE '%keyword%'
    //
    // That caused this error:
    //    TypeError: values.map is not a function
    //
    // Because array fields CANNOT use ILIKE.
    //
    // FIX → Use Op.overlap / Op.contains for ARRAY(TEXT) columns.

    const where = {
      [Op.or]: [
        // TEXT fields → still safe to use ILIKE
        { file_name: { [Op.iLike]: `%${q}%` } },
        { short_summary_en: { [Op.iLike]: `%${q}%` } },

        // CHANGE #3 — ARRAY field: detailed_summary_en
        //  Old: ILIKE (broke the search)
        // New: overlap (if ANY array element contains q)
        { detailed_summary_en: { [Op.overlap]: arr } },

        // CHANGE #4 — ARRAY field: tags
        // Now uses overlap with normalized array input
        { tags: { [Op.overlap]: arr } },
      ],
    };

    // CHANGE #5 — Department filter using ARRAY contains
    // Correct way to match array column
    if (department) {
      where.assigned_departments = { [Op.contains]: [department] };
    }

    // Priority filter (string ENUM)
    if (priority) {
      where.priority = priority.toUpperCase();
    }

    const results = await Document.findAll({
      where,
      limit: parseInt(limit),
      order: [["updatedAt", "DESC"]],
      attributes: { exclude: ["raw_text"] },
    });

    return res.json({
      success: true,
      query: q,
      results: results.length,
      documents: results,
    });
  } catch (error) {
    console.error("Search failed:", error);
    return res.status(500).json({
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
