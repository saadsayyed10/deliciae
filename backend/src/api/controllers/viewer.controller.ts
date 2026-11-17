/* backend\src\api\controller\viewer.controller.ts */

// Import request and response objects to manage the HTTP communication cycle
import { Request, Response } from "express";

// Import all services as an instance
import * as viewerServices from "../services/viewer.service";

/*
Controller: To sign up Viewer user account using first and last name with generating username, encrypting and saving it in the database for the authentication and JWT validation for authorization.

Endpoint: /api/v1/viewer/signup
Method:POST 
Authentication: False
*/
export const signUpViewerController = async (req: Request, res: Response) => {
  const { firstName, lastName, username, profilePictureUrl } = req.body;

  // Validate first and last name of the author
  if (!firstName || !lastName) {
    console.log("Please appropriately enter your first and last name");
    return res.status(400).json({
      status: false,
      error: "Please appropriately enter your first and last name",
    });
  }

  // Validate viewer username
  if (!username || username.length <= 9) {
    console.log("Please enter a valid username with more than 9 characters");
    return res.status(400).json({
      status: false,
      error: "Please enter a valid username with more than 9 characters",
    });
  }

  try {
    const { token, user } = await viewerServices.signUpViewer(
      firstName,
      lastName,
      username,
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
