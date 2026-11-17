/* backend\src\server.ts */

// Import classes, instances and libraries
import express from "express";
import { env } from "./config/env.config";
import { connectDB } from "./config/db.config";

const app = express(); // Initialize express instance
const PORT = env.PORT; // Server port

// Custom handler to start server asynchronously
const startServer = async () => {
  if (!PORT) {
    console.error("Please run the application on an open port"); // Throw error if there is no port assigned
  }

  try {
    await connectDB(); // Check database connection before starting the server
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`)); // Spin the server application
  } catch (error: any) {
    console.error(`Failed to start server: ${error.message}`); // Throw error if server spinning fails
  }
};

startServer();

export default app;
