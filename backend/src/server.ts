/* backend\src\server.ts */

// Import classes, instances and libraries
import express from "express";
import cors from "cors";
import { env } from "./config/env.config";
import { connectDB } from "./config/db.config";
import mainRouterV1 from "./middlewares/route.middleware";

const app = express(); // Initialize express instance
const PORT = env.PORT; // Server port

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouterV1); // Version 1

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
