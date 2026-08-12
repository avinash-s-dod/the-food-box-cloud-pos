import app from "./app.js";
import { env } from "./config/env.js"; 
import { connectDB } from "./config/db.js";

// Main server startup function
const startServer = async () => {
  // Connect to MongoDB Database
  await connectDB();

  // Start HTTP Server listening on the configured Port
  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
};

// Initiate server startup sequence
startServer();