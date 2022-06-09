import { Router } from "express";

import {
  deleteShortUrl,
  getUrlById,
  openShortUrl,
  postUrl,
} from "../controllers/urlsController.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import urlSchema from "../schemas/urlSchema.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validSchema(urlSchema), validToken, postUrl);

urlsRouter.get("/urls/:id", getUrlById);

urlsRouter.get("/urls/open/:shortUrl", openShortUrl);

urlsRouter.delete("/urls/:id", validToken, deleteShortUrl);

export default urlsRouter;
