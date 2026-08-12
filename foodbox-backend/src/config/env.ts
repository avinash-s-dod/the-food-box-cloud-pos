import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Export loaded environment variables with defaults if missing
export const env = {
  NODE_ENV:
    (process.env.NODE_ENV as "development" | "production" | "test") ||
    "development",
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
};
