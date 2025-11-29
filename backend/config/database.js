import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

/**
 * Sequelize instance initialization.
 * Configures the connection to the PostgreSQL database using environment variables.
 */
const sequelize = new Sequelize(
  process.env.DB_NAME || "document_processor",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false, // Set to console.log to see raw SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

/**
 * Establishes the database connection and synchronizes models.
 *
 * @description
 * 1. Authenticates with the database.
 * 2. Syncs models using `alter: true` (updates schema without dropping data).
 * 3. Exits the process if the connection fails.
 *
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("🔌 Database authentication successful.");

    // Sync models with the database
    // Note: { alter: true } checks current state of tables and adds/removes columns to match the model.
    await sequelize.sync({ alter: true });

    console.log("✅ PostgreSQL Connection established & Models Synced.");
  } catch (error) {
    console.error("❌ Unable to connect to PostgreSQL:", error);
    process.exit(1); // Fatal error: Exit app if DB fails to connect on startup
  }
};

/**
 * Closes the database connection gracefully.
 * Should be called during server shutdown to prevent hanging connections.
 *
 * @returns {Promise<void>}
 */
export const disconnectDB = async () => {
  try {
    await sequelize.close();
    console.log("🛑 PostgreSQL Connection closed.");
  } catch (error) {
    console.error("❌ Error closing PostgreSQL connection:", error);
  }
};

export { sequelize };
