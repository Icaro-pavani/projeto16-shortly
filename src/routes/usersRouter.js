import { Router } from "express";
import { getUserById } from "../controllers/usersController.js";
import validToken from "../middlewares/validToken.js";

const usersRouter = Router();

usersRouter.get("/users/:id", validToken, getUserById);

export default usersRouter;
