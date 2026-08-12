import dotenv from "dotenv";
import type { StringValue } from "ms";

// Load environment variables from .env file
dotenv.config();


const requiredEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

// Export loaded environment variables with defaults if missing
export const env = {
  NODE_ENV:
    (process.env.NODE_ENV as "development" | "production" | "test") ||
    "development",

  PORT: Number(process.env.PORT) || 5000,

  MONGO_URI: requiredEnv("MONGO_URI"),

  JWT_SECRET: requiredEnv("JWT_SECRET"),

  JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN || "7d") as StringValue,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
};