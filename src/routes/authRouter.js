import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";
import validSignIn from "../middlewares/validSignIn.js";
import validSignUp from "../middlewares/validSignUp.js";

const authRouter = Router();

authRouter.post("/signup", validSignUp, signUp);

authRouter.post("/signin", validSignIn, signIn);

export default authRouter;
