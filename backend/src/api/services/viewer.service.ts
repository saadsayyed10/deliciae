/* backend\src\api\services\viewer.service.ts */

// Import prisma singleton instance to use ORM features
import prisma from "../../lib/prisma.orm";

// Import generate token function
import { generateViewerToken } from "../../lib/token";

// Import Enum to save appropriate type for the user
import { UserType } from "@prisma/client";

// Service to register viewer account
export const signUpViewer = async (
  firstName: string,
  lastName: string,
  username: string,
  profilePictureUrl?: string,
) => {
  // Account with same username mustn't exist
  const existingViewer = await prisma.viewer.findUnique({
    where: {
      username,
    },
  });
  if (existingViewer) throw new Error("Account username already taken");

  // Insert the data into the viewer table
  const viewer = await prisma.viewer.create({
    data: {
      firstName,
      lastName,
      username,
      userType: UserType.VIEWER, // Save with a specific type
      profilePictureUrl,
    },
  });

  // Generate token for authentication
  const token = generateViewerToken(viewer.id);

  // Encapsulate user data excluding password
  const user = {
    id: viewer.id,
    firstName: viewer.firstName,
    lastName: viewer.lastName,
    username: viewer.username,
    userType: viewer.userType,
    profilePictureUrl: viewer.profilePictureUrl,
    createdAt: viewer.createdAt,
  };

  // Return token and user data
  return { token, user };
};

// TODO: Implement Login Viewer Account service after implementing cryptography handler in the frontend
