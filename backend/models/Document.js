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
        "PREPROCESSED",
        "SUMMARIZING",
        "SUMMARIZED",
        "ROUTING",
        "ROUTED",
        "COMPLETED",
        "FAILED",
        "UNREADABLE",
        "PARTIALLY_COMPLETED"
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
    timestamps: true, // createdAt & updatedAt
  }
);

export default Document;
