/* backend\src\config\env.config.ts */

// Import configure to enable dotenv
import "dotenv/config";

// Custom env fields that can be imported globally in server application
export const env = {
  PORT: process.env.PORT || 8080,
  JWT_SECRET_AUTHOR: process.env.JWT_SECRET_AUTHOR! || "sameoldtreva",
  JWT_SECRET_VIEWER: process.env.JWT_SECRET_VIEWER! || "rozierdemorte",
  CIPHER_KEY: process.env.CIPHER_KEY! || "deliciaesecurekey",
};
