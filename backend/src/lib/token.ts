/* backend\src\lib\token.ts */

// Import JWT library
import jwt from "jsonwebtoken";

// Import JWT secret from env configuration to validate authentication
import { env } from "../config/env.config";

// Handler to generate token for an author's authentication
export const generateAuthorToken = (userId: string) => {
  return jwt.sign({ userId }, env.JWT_SECRET_AUTHOR, { expiresIn: "7d" }); // Expires in a week
};

// Handler to generate token for a viewer's authentication
export const generateViewerToken = (userId: string) => {
  return jwt.sign({ userId }, env.JWT_SECRET_VIEWER, { expiresIn: "60d" }); // Expires in approx. 2 months
};
