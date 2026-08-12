import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../logger/logger.js";

// Establishes a connection to the MongoDB database using Mongoose
export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("MongoDB connected successfully");
  } catch (err) {
    logger.error("MongoDB connection failed", {
      message: err instanceof Error ? err.message : "Unknown database error",
    });
    process.exit(1); // Exit process with failure if DB connection is unsuccessful
  }
};
