import { stripHtml } from "string-strip-html";

import signInSchema from "../schemas/signInSchema.js";

export default async function validSignIn(req, res, next) {
  try {
    const { email, password } = req.body;
    const signInBody = {
      email: stripHtml(email).result.trim(),
      password: stripHtml(password).result.trim(),
    };
    const signInValidation = await signInSchema.validateAsync(signInBody, {
      abortEarly: false,
    });
    res.locals.signInBody = signInValidation;
  } catch (error) {
    console.log(error);
    return res.status(422).send(error.message);
  }

  next();
}
