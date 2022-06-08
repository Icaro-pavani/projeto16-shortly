import { Router } from "express";

import {
  getUrlById,
  openShortUrl,
  postUrl,
} from "../controllers/urlsController.js";
import validToken from "../middlewares/validToken.js";
import validUrl from "../middlewares/validUrl.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validUrl, validToken, postUrl);

urlsRouter.get("/urls/:id", getUrlById);

urlsRouter.get("/urls/open/:shortUrl", openShortUrl);

export default urlsRouter;
