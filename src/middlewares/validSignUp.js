import { stripHtml } from "string-strip-html";

import signUpSchema from "../schemas/signUpSchema.js";

export default async function validSignUp(req, res, next) {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const signUpBody = {
      name: stripHtml(name).result.trim(),
      email: stripHtml(email).result.trim(),
      password: stripHtml(password).result.trim(),
      confirmPassword: stripHtml(confirmPassword).result.trim(),
    };
    const signUpValidation = await signUpSchema.validateAsync(signUpBody);
    res.locals.signUpBody = signUpValidation;
  } catch (error) {
    console.log(error);
    return res.status(422).send(error.message);
  }

  next();
}
