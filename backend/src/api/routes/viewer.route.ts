// Import Router class from express
import { Router } from "express";

// Import all viewer controllers as one instance
import * as controllers from "../controllers/viewer.controller";
import { protectViewerAuth } from "../../middlewares/auth.middleware";

// Viewer routes handler
const viewerRouter = Router();

// APIs with POST method
viewerRouter.post("/signup", controllers.signUpViewerController);

// APIs with GET method
viewerRouter.get(
  "/account",
  protectViewerAuth,
  controllers.fetchViewerProfileController,
);

export default viewerRouter;
