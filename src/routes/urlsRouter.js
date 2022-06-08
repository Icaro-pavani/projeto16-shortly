import { Router } from "express";

import { postUrl } from "../controllers/urlsController.js";
import validToken from "../middlewares/validToken.js";
import validUrl from "../middlewares/validUrl.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validUrl, validToken, postUrl);

export default urlsRouter;
