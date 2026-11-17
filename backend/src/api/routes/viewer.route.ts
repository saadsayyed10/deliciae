// Import Router class from express
import { Router } from "express";

// Import all viewer controllers as one instance
import * as controllers from "../controllers/viewer.controller";

// Viewer routes handler
const viewerRouter = Router();

// APIs with POST method
viewerRouter.post("/signup", controllers.signUpViewerController);

export default viewerRouter;
