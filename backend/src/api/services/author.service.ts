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
  // Get the count of the author account
  const count = await prisma.author.findMany();
  if (count.length > 1) {
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

  // Encapsulate user data excluding ID and password
  const user = {
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
