/* backend\src\api\services\viewer.service.ts */

// Import prisma singleton instance to use ORM features
import prisma from "../../lib/prisma.orm";

// Import generate token function
import { generateViewerToken } from "../../lib/token";

// Import Enum to save appropriate type for the user
import { UserType } from "@prisma/client";

// Import encryption and decryption functions to secure username of the viewer
import { encryptViewerUsername, decryptViewerUsername } from "../../lib/crypto";

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

  const cipherUsername = encryptViewerUsername(username);

  // Insert the data into the viewer table
  const viewer = await prisma.viewer.create({
    data: {
      firstName,
      lastName,
      username: cipherUsername,
      userType: UserType.VIEWER, // Save with a specific type
      profilePictureUrl,
    },
  });

  // Generate token for authentication
  const token = generateViewerToken(viewer.id);

  // Encapsulate user data
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

// Service to log in to account of Viewer
export const signInViewer = async (username: string) => {
  // Encrypt the username to search in database
  const cipherUsername = encryptViewerUsername(username);

  // Account with same encrypted username must exist
  const viewer = await prisma.viewer.findUnique({
    where: {
      username: cipherUsername,
    },
  });
  if (!viewer) throw new Error("Invalid username entered"); // Throw error if username is incorrect or doesn't exist in the database

  // Generate token for authentication
  const token = generateViewerToken(viewer.id);

  // Decrypt the username to send payload only to the viewer
  const originalUsername = decryptViewerUsername(viewer.username);

  // Encapsulate user data excluding password
  const user = {
    id: viewer.id,
    firstName: viewer.firstName,
    lastName: viewer.lastName,
    username: originalUsername,
    userType: viewer.userType,
    profilePictureUrl: viewer.profilePictureUrl,
    createdAt: viewer.createdAt,
  };

  return { token, user };
};

// Service to fetch account of Viewer
export const fetchViewerProfile = async (userId: string) => {
  // Fetch viewer account using the ID from the authenticated token
  const viewer = await prisma.viewer.findUnique({
    where: {
      id: userId,
    },
  });
  if (!viewer) {
    throw new Error("Unauthorized: User ID was not found in the token");
  }

  const originalUsername = decryptViewerUsername(viewer.username);

  // Encapsulate viewer data
  const user = {
    id: viewer.id,
    firstName: viewer.firstName,
    lastName: viewer.lastName,
    username: originalUsername,
    userType: viewer.userType,
    profilePictureUrl: viewer.profilePictureUrl,
    createdAt: viewer.createdAt,
  };

  // Return the author profile data
  return user;
};

// Service to update basic details of Viewer account
export const updateViewerProfile = async (
  firstName: string,
  lastName: string,
  profilePictureUrl: string,
  userId: string,
) => {
  // Fetch viewer account using the ID from the authenticated token
  const viewerId = await prisma.viewer.findUnique({
    where: {
      id: userId,
    },
  });
  if (!viewerId) {
    throw new Error("Unauthorized: User ID was not found in the token");
  }

  // Update the viewer account
  const viewer = await prisma.viewer.update({
    where: {
      id: userId,
    },
    data: {
      firstName,
      lastName,
      profilePictureUrl,
    },
  });

  // Encapsulate author data excluding password
  const user = {
    id: viewer.id,
    firstName: viewer.firstName,
    lastName: viewer.lastName,
    username: viewer.username,
    userType: viewer.userType,
    profilePictureUrl: viewer.profilePictureUrl,
    createdAt: viewer.createdAt,
  };

  // Return the viewer profile data
  return user;
};

// Service to delete account of Viewer
export const deleteViewerProfile = async (userId: string) => {
  // Fetch viewer account using the ID from the authenticated token
  const viewer = await prisma.viewer.findUnique({
    where: {
      id: userId,
    },
  });
  if (!viewer) {
    throw new Error("Unauthorized: User ID was not found in the token");
  }

  // Delete user account permanently
  await prisma.viewer.delete({
    where: {
      id: userId,
    },
  });
};
