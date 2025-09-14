const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    // File information
    filename: {
      type: String,
      required: true,
    },
    originalname: {
      type: String,
      required: true,
    },
    file_path: {
      type: String,
      required: true,
    },

    // Processing status
    processing_status: {
      metadata: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
      },
      ocr: {
        type: String,
        enum: ["pending", "success", "failed", "skipped"],
        default: "pending",
      },
      llm_analysis: {
        type: String,
        enum: ["pending", "success", "failed", "partial_failure", "skipped"],
        default: "pending",
      },
      overall: {
        type: String,
        enum: ["pending", "success", "partial_success", "failed"],
        default: "pending",
      },
    },

    // Metadata
    metadata: {
      doc_type: String,
      file_size: Number,
      created_time: Date,
      processed_time: {
        type: Date,
        default: Date.now,
      },
      confidence: Number,
      language: String,
      processing_time: Number, // in seconds
    },

    // Extracted content
    extracted_text: {
      type: String,
      default: "",
    },

    // Content analysis (from LLM)
    content_analysis: {
      title: {
        type: String,
        default: "",
      },
      purpose: {
        type: String,
        default: "",
      },
      departments: [
        {
          type: String,
          enum: [
            "Engineering",
            "HR",
            "Finance",
            "Safety",
            "Legal",
            "Procurement",
            "Operations",
            "IT",
            "Administration",
          ],
        },
      ],
      priority: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium",
      },
      deadlines: {
        type: String,
        default: "Not applicable",
      },
      document_category: {
        type: String,
        default: "general",
      },
      short_summary: {
        type: String,
        default: "",
      },
      detailed_summary: [
        {
          type: String,
        },
      ],
      key_entities: [
        {
          type: String,
        },
      ],
    },

    // Processing errors
    processing_errors: [
      {
        type: String,
      },
    ],

    // Upload timestamp
    upload_time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Create text indexes for searching
DocumentSchema.index({
  "content_analysis.title": "text",
  "content_analysis.short_summary": "text",
  extracted_text: "text",
  "content_analysis.key_entities": "text",
});

// Index for common queries
DocumentSchema.index({ "content_analysis.departments": 1 });
DocumentSchema.index({ "content_analysis.priority": 1 });
DocumentSchema.index({ "processing_status.overall": 1 });
DocumentSchema.index({ upload_time: -1 });

module.exports = mongoose.model("Document", DocumentSchema);
