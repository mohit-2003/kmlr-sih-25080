import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Document = sequelize.define(
  "Document",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // --- File Metadata ---
    file_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Unique Fingerprint of the file content
    file_hash: {
      type: DataTypes.STRING(64), // SHA-256 is always 64 chars
      allowNull: true,
    },
    file_type: {
      type: DataTypes.STRING,
      defaultValue: "pdf",
    },
    storage_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    uploaded_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: "users",
      //   key: "id",
      // },
    },
    file_size: {
      type: DataTypes.BIGINT,
    },

    // --- Priority ---
    priority: {
      type: DataTypes.ENUM("LOW", "NORMAL", "HIGH"),
      defaultValue: "NORMAL",
    },

    // --- Processing Status ---
    status: {
      type: DataTypes.ENUM(
        "UPLOADED",
        "PREPROCESSING",
        "PROCESSING_OCR",
        "PROCESSING_LLM",
        "COMPLETED",
        "FAILED",
        "UNREADABLE"
      ),
      defaultValue: "UPLOADED",
    },
    error_stage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // --- Processing Data ---
    language_detected: {
      type: DataTypes.STRING,
    },
    ocr_confidence: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    raw_text: {
      type: DataTypes.TEXT, // OCR text, internal use only
    },

    // --- Summaries (Bilingual) ---
    short_summary_en: {
      type: DataTypes.TEXT,
    },
    short_summary_ml: {
      type: DataTypes.TEXT,
    },
    detailed_summary_en: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    detailed_summary_ml: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },

    // --- AI Outputs ---
    action_items: {
      type: DataTypes.JSONB,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    // Track token usage for cost analysis
    llm_metadata: {
      type: DataTypes.JSONB,
    },

    // --- Routing ---
    assigned_departments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    routed_at: {
      type: DataTypes.DATE,
    },
    completed_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "documents",
    timestamps: true,
    indexes: [{ fields: ["status"] }, { fields: ["uploaded_by"] }],
  }
);

export default Document;
