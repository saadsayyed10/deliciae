// Import Router class from express
import { Router } from "express";

// Import all author controllers as one instance
import * as controllers from "../controllers/author.controller";

// Author routes handler
const authorRouter = Router();

// APIs with POST method
authorRouter.post("/signup", controllers.signUpAuthorController);
authorRouter.post("/signin", controllers.signInAuthorController);

// APIs with GET method
authorRouter.get("/account", controllers.fetchAuthorProfileController);

export default authorRouter;
