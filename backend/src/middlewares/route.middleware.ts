// Import Router class from express
import { Router } from "express";

// Import all other API routes
import authorRouter from "../api/routes/author.route";
import viewerRouter from "../api/routes/viewer.route";

// Main router middleware handler for 1st version
const mainRouterV1 = Router();

mainRouterV1.use("/author", authorRouter);
mainRouterV1.use("/viewer", viewerRouter);

export default mainRouterV1;
