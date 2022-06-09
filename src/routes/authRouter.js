import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";
import validSchema from "../middlewares/validSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";

const authRouter = Router();

authRouter.post("/signup", validSchema(signUpSchema), signUp);

authRouter.post("/signin", validSchema(signInSchema), signIn);

export default authRouter;
