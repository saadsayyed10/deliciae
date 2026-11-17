/* backend\src\config\db.config.ts */

// Import prisma singleton instance
import prisma from "../lib/prisma.orm";

// Handler to check database connection
export const connectDB = async () => {
  try {
    // Establish connection to database
    await prisma.$connect();
    console.log("Connected to PostgreSQL DB"); // Log this message when connection is healthy
  } catch (error: any) {
    console.log(`Failed to connect PostgreSQL DB: ${error.message}`); // Log this message when connection is unhealthy
  }
};
