import { Router } from "express";

import { getRanking, getUserById } from "../controllers/usersController.js";
import validToken from "../middlewares/validToken.js";

const usersRouter = Router();

usersRouter.get("/users/:id", validToken, getUserById);

usersRouter.get("/ranking", getRanking);

export default usersRouter;
