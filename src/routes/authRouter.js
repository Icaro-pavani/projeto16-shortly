import { Router } from "express";

import { signUp } from "../controllers/authController.js";
import validSignUp from "../middlewares/validSignUp.js";

const authRouter = Router();

authRouter.post("/signup", validSignUp, signUp);

export default authRouter;
