/* backend\src\api\services\author.service.ts */

// Import prisma singleton instance to use ORM features
import prisma from "../../lib/prisma.orm";

// Import bcryptjs to hash password
import bcrypt from "bcryptjs";

// Import generate token function
import { generateAuthorToken } from "../../lib/token";

// Import Enum to save appropriate type for the user
import { UserType } from "@prisma/client";

// Service to register author account
export const signUpAuthor = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  profilePictureUrl?: string,
) => {
  // Account with same email mustn't exist
  const existingAuthor = await prisma.author.findUnique({
    where: {
      email,
    },
  });
  if (existingAuthor) throw new Error("Account with this email already exists");

  // Get the count of the author account
  const count = await prisma.author.findMany();
  if (count.length == 1) {
    throw new Error("Only one author is valid to use this application"); // Only 1 exact field is valid
  }

  // Hash password for security
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the data into the author table
  const author = await prisma.author.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType: UserType.AUTHOR, // Save with a specific type
      profilePictureUrl,
    },
  });

  // Generate token for authentication
  const token = generateAuthorToken(author.id);

  // Encapsulate user data excluding password
  const user = {
    id: author.id,
    firstName: author.firstName,
    lastName: author.lastName,
    email: author.email,
    userType: author.userType,
    profilePictureUrl: author.profilePictureUrl,
    createdAt: author.createdAt,
  };

  // Return token and user data
  return { token, user };
};

// Service to login into author account
export const signInAuthor = async (email: string, password: string) => {
  // Account with same email must exist
  const author = await prisma.author.findUnique({
    where: {
      email,
    },
  });
  if (!author) throw new Error("Account with this email does not exists");

  // Verify author password with the hashed password
  const verifyPassword = await bcrypt.compare(password, author.password);
  if (!verifyPassword) {
    throw new Error("Password is incorrect");
  }

  // Generate token for authentication
  const token = generateAuthorToken(author.id);

  // Encapsulate user data excluding password
  const user = {
    id: author.id,
    firstName: author.firstName,
    lastName: author.lastName,
    email: author.email,
    userType: author.userType,
    profilePictureUrl: author.profilePictureUrl,
    createdAt: author.createdAt,
  };

  // Return token and user data
  return { token, user };
};

// Service to fetch account of Author
export const fetchAuthorProfile = async (userId: string) => {
  // Fetch author account using the ID from the authenticated token
  const author = await prisma.author.findUnique({
    where: {
      id: userId,
    },
  });
  if (!author) {
    throw new Error("Unauthorized: User ID was not found in the token");
  }

  // Encapsulate author data excluding password
  const user = {
    id: author.id,
    firstName: author.firstName,
    lastName: author.lastName,
    email: author.email,
    userType: author.userType,
    profilePictureUrl: author.profilePictureUrl,
    createdAt: author.createdAt,
  };

  // Return the author profile data
  return user;
};

// Service to update basic details of Author account
export const updateAuthorProfile = async (
  firstName: string,
  lastName: string,
  profilePictureUrl: string,
  userId: string,
) => {
  // Fetch author account using the ID from the authenticated token
  const authorId = await prisma.author.findUnique({
    where: {
      id: userId,
    },
  });
  if (!authorId) {
    throw new Error("Unauthorized: User ID was not found in the token");
  }

  // Update the author account
  const author = await prisma.author.update({
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
    id: author.id,
    firstName: author.firstName,
    lastName: author.lastName,
    email: author.email,
    userType: author.userType,
    profilePictureUrl: author.profilePictureUrl,
    createdAt: author.createdAt,
  };

  // Return the author profile data
  return user;
};

// Service to delete account of Author
export const deleteAuthorProfile = async (userId: string) => {
  // Fetch author account using the ID from the authenticated token
  const author = await prisma.author.findUnique({
    where: {
      id: userId,
    },
  });
  if (!author) {
    throw new Error("Unauthorized: User ID was not found in the token");
  }

  // Delete user account permenently
  await prisma.author.delete({
    where: {
      id: userId,
    },
  });
};
