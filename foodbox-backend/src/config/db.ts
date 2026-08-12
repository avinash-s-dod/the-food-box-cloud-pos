import mongoose from "mongoose";
import { env } from "./env.js";

// Establishes a connection to the MongoDB database using Mongoose
export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1); // Exit process with failure if DB connection is unsuccessful
  }
};
