import express from "express";
import { env } from "./config/env.config";

const app = express();
const PORT = env.PORT;

const startServer = async () => {
  if (!PORT) {
    console.error("Please run the application on an open port");
  }

  try {
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
  } catch (error: any) {
    console.log(`Failed to start server: ${error.message}`);
  }
};

startServer();

export default app;
