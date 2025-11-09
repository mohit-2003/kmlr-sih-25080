import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Document = sequelize.define(
  "Document",
  {
    // File information
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Processing status (JSONB)
    processing_status: {
      type: DataTypes.JSONB,
      defaultValue: {
        metadata: "pending",
        ocr: "pending",
        llm_analysis: "pending",
        overall: "pending",
      },
    },

    // Metadata
    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {
        doc_type: null,
        file_size: null,
        created_time: null,
        processed_time: new Date(),
        confidence: null,
        language: null,
        processing_time: null,
      },
    },

    // Extracted text
    extracted_text: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },

    // Content analysis (LLM)
    content_analysis: {
      type: DataTypes.JSONB,
      defaultValue: {
        title: "",
        purpose: "",
        departments: [],
        priority: "medium",
        deadlines: "Not applicable",
        document_category: "general",
        short_summary: "",
        detailed_summary: [],
        key_entities: [],
      },
    },

    // Processing errors
    processing_errors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },

    // Upload timestamp
    upload_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    indexes: [
      {
        using: "GIN",
        fields: ["content_analysis"],
        name: "content_analysis_gin_idx",
      },
      {
        using: "GIN",
        fields: ["processing_status"],
        name: "processing_status_gin_idx",
      },
      {
        fields: ["upload_time"],
        order: [["upload_time", "DESC"]],
        name: "upload_time_idx",
      },
    ],
  }
);

export default Document;
