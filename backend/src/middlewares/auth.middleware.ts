// backend/src/middlewares/auth.middleware.ts

// Import libraries and instances to protect API endpoints
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env.config";
import prisma from "../lib/prisma.orm";

// Type to decode user ID using JWTPayload class
interface DecodeTokenType extends JwtPayload {
  userId: string;
}

// Author authentication middleware handler
export const protectAuthorAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.header("Authorization");

    // Throw error if headers are invalid or missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET_AUTHOR!,
    ) as DecodeTokenType;

    const user = await prisma.author.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    // Throw error if token is not provided
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: token not provided" });
    }

    // Throw error if user is not tagged with token
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    (req as any).user = user;

    next();
  } catch (error: any) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
};

// Viewer authentication middleware handler
export const protectViewerAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.header("Authorization");

    // Throw error if headers are invalid or missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET_VIEWER!,
    ) as DecodeTokenType;

    const user = await prisma.viewer.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    // Throw error if token is not provided
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: token not provided" });
    }

    // Throw error if user is not tagged with token
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    (req as any).user = user;

    next();
  } catch (error: any) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
};
