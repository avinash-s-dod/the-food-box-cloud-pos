import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { logger } from "./logger/logger.js";

// Main server startup function
const startServer = async () => {
  // Connect to MongoDB Database
  await connectDB();

  // Start HTTP Server listening on the configured Port
  app.listen(env.PORT, () => {
    logger.info("Server started", {
      port: env.PORT,
      environment: env.NODE_ENV,
    });
  });
};

// Initiate server startup sequence
startServer();
