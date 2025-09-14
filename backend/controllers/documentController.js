const documentProcessor = require("../services/documentProcessor");
const db = require("../config/database");
const Document = require("../models/Document");

// Main document processing endpoint
const processDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    // Process the document through our pipeline
    const result = await documentProcessor.processDocument(req.file);

    // Save complete result to MongoDB
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

    // Save to database
    const savedDocument = await Document.create(documentData);
    console.log(`✅ Document saved to database with ID: ${savedDocument._id}`);

    // Return response with database ID
    res.json({
      ...result,
      document_id: savedDocument._id,
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

// Get all documents with pagination and filtering
const getDocuments = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      department,
      priority,
      status,
      search,
    } = req.query;

    // Build filter query
    const filter = {};

    if (department) {
      filter["content_analysis.departments"] = department;
    }

    if (priority) {
      filter["content_analysis.priority"] = priority;
    }

    if (status) {
      filter["processing_status.overall"] = status;
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Execute query with pagination
    const documents = await Document.find(filter)
      .select("-extracted_text") // Exclude large text field from list view
      .sort({ upload_time: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Document.countDocuments(filter);

    res.json({
      success: true,
      documents,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        total_documents: total,
        has_next: page * limit < total,
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

// Get single document by ID
const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
      });
    }

    res.json({
      success: true,
      document,
    });
  } catch (error) {
    console.error("Get document by ID error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch document",
    });
  }
};

// Search documents
const searchDocuments = async (req, res) => {
  try {
    const { q, department, priority, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Search query is required",
      });
    }

    const filter = {
      $text: { $search: q },
    };

    if (department) {
      filter["content_analysis.departments"] = department;
    }

    if (priority) {
      filter["content_analysis.priority"] = priority;
    }

    const documents = await Document.find(filter, {
      score: { $meta: "textScore" },
    })
      .select("-extracted_text")
      .sort({ score: { $meta: "textScore" } })
      .limit(parseInt(limit));

    res.json({
      success: true,
      query: q,
      results: documents.length,
      documents,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      error: "Search failed",
    });
  }
};

// Get analytics/stats
const getAnalytics = async (req, res) => {
  try {
    const analytics = await Document.aggregate([
      {
        $group: {
          _id: null,
          total_documents: { $sum: 1 },
          successful_processing: {
            $sum: {
              $cond: [{ $eq: ["$processing_status.overall", "success"] }, 1, 0],
            },
          },
          failed_processing: {
            $sum: {
              $cond: [{ $eq: ["$processing_status.overall", "failed"] }, 1, 0],
            },
          },
        },
      },
    ]);

    const departmentStats = await Document.aggregate([
      { $unwind: "$content_analysis.departments" },
      {
        $group: {
          _id: "$content_analysis.departments",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const priorityStats = await Document.aggregate([
      {
        $group: {
          _id: "$content_analysis.priority",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      analytics: analytics[0] || {},
      department_distribution: departmentStats,
      priority_distribution: priorityStats,
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
  searchDocuments,
  getAnalytics,
};
