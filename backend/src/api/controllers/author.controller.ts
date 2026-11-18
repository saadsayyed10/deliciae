/* backend\src\api\controller\author.controller.ts */

// Import request and response objects to manage the HTTP communication cycle
import { Request, Response } from "express";

// Import all services as an instance
import * as authorServices from "../services/author.service";

/*
Controller: To sign up only one unique Author user account using email-password authentication with bcrypt hashing and JWT validation for authorization.

Endpoint: /api/v1/author/signup
Method: POST 
Authentication: False
*/
export const signUpAuthorController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, profilePictureUrl } = req.body;

  // Validate first and last name of the author
  if (!firstName || !lastName) {
    console.log("Please appropriately enter your first and last name");
    return res.status(400).json({
      status: false,
      error: "Please appropriately enter your first and last name",
    });
  }

  // Validate email address of the author
  if (!email || !email.includes("@")) {
    console.log("Please enter a valid email address");
    return res.status(400).json({
      status: false,
      error: "Please enter a valid email address",
    });
  }

  // Validate author password
  if (!password || password.length <= 8) {
    console.log("Please enter a valid password with more than 8 characters");
    return res.status(400).json({
      status: false,
      error: "Please enter a valid password with more than 8 characters",
    });
  }

  try {
    const { token, user } = await authorServices.signUpAuthor(
      firstName,
      lastName,
      email,
      password,
      profilePictureUrl,
    );

    res
      .status(201)
      .json({ status: true, message: "Welcome to Deliciae...", token, user });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
};

/*
Controller: To login Author user account using email-password authentication using JWT where token automatically expires in a week.

Endpoint: /api/v1/author/signin
Method: POST 
Authentication: False
*/
export const signInAuthorController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate email address of the author
  if (!email || !email.includes("@")) {
    console.log("Please enter a valid email address");
    return res.status(400).json({
      status: false,
      error: "Please enter a valid email address",
    });
  }

  // Validate author password
  if (!password || password.length <= 8) {
    console.log("Please enter a valid password with more than 8 characters");
    return res.status(400).json({
      status: false,
      error: "Please enter a valid password with more than 8 characters",
    });
  }

  try {
    const { token, user } = await authorServices.signInAuthor(email, password);

    res.status(200).json({
      status: true,
      message: "You have logged in to Deliciae...",
      token,
      user,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
};

/*
Controller: Fetch Author user profile in the settings menu for readability.

Endpoint: /api/v1/author/account
Method: GET
Authentication: True
*/
export const fetchAuthorProfileController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as any).author.id;
    if (!userId) {
      console.log("Unauthorized: Author must be logged in to fetch profile");
      return res.status(401).json({
        status: false,
        error: "Unauthorized: Author must be logged in to fetch profile",
      });
    }

    const author = await authorServices.fetchAuthorProfile(userId!);

    res.status(200).json({
      status: true,
      author,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
};

/*
Controller: To update basic details like name and profile picture for the Author account.

Endpoint: /api/v1/author/account
Method: PUT
Authentication: True
*/
export const updateAuthorProfileController = async (
  req: Request,
  res: Response,
) => {
  const { firstName, lastName, profilePictureUrl } = req.body;

  try {
    const userId = (req as any).author.id;
    if (!userId) {
      console.log("Unauthorized: Author must be logged in to fetch profile");
      return res.status(401).json({
        status: false,
        error: "Unauthorized: Author must be logged in to fetch profile",
      });
    }

    const author = await authorServices.updateAuthorProfile(
      firstName,
      lastName,
      profilePictureUrl,
      userId!,
    );

    res.status(200).json({
      status: true,
      message: "Updated author account",
      author,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
};
