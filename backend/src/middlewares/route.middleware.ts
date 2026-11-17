// Import Router class from express
import { Router } from "express";

// Import all other API routes
import authorRouter from "../api/routes/author.route";

// Main router middleware handler for 1st version
const mainRouterV1 = Router();

mainRouterV1.use("/author", authorRouter);

export default mainRouterV1;
