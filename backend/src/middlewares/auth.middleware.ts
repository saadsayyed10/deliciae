// backend/src/middlewares/auth.middleware.ts

// Import libraries and instances to protect API endpoints
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env.config";
import prisma from "../lib/prisma.orm";

// Type to decode author user ID using JWTPayload class
interface DecodeAuthorTokenType extends JwtPayload {
  authorId: string;
}

// Type to decode author user ID using JWTPayload class
interface DecodeViewerTokenType extends JwtPayload {
  viewerId: string;
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
    ) as DecodeAuthorTokenType;

    const author = await prisma.author.findUnique({
      where: {
        id: decoded.authorId,
      },
    });

    // Throw error if token is not provided
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: token not provided" });
    }

    // Throw error if user is not tagged with token
    if (!author) {
      return res.status(401).json({ error: "Unauthorized: Author not found" });
    }

    (req as any).author = author;

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
    ) as DecodeViewerTokenType;

    const viewer = await prisma.viewer.findUnique({
      where: {
        id: decoded.viewerId,
      },
    });

    // Throw error if token is not provided
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: token not provided" });
    }

    // Throw error if user is not tagged with token
    if (!viewer) {
      return res.status(401).json({ error: "Unauthorized: Viewer not found" });
    }

    (req as any).viewer = viewer;

    next();
  } catch (error: any) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
};
