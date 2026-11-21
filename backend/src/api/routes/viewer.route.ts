// Import Router class from express
import { Router } from "express";

// Import all viewer controllers as one instance
import * as controllers from "../controllers/viewer.controller";
import { protectViewerAuth } from "../../middlewares/auth.middleware";

// Viewer routes handler
const viewerRouter = Router();

// APIs with POST method
viewerRouter.post("/signup", controllers.signUpViewerController);
viewerRouter.post("/signin", controllers.signInViewerController);

// APIs with GET method
viewerRouter.get(
  "/account",
  protectViewerAuth,
  controllers.fetchViewerProfileController,
);

// APIs with PUT method
viewerRouter.put(
  "/account",
  protectViewerAuth,
  controllers.updateViewerProfileController,
);

// APIs with DELETE method
viewerRouter.delete(
  "/account",
  protectViewerAuth,
  controllers.deleteViewerProfileController,
);

export default viewerRouter;
