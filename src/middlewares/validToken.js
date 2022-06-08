import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import db from "./../db.js";
import tokenSchema from "../schemas/tokenSchema.js";

dotenv.config();

export default async function validToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    const tokenValidation = await tokenSchema.validateAsync(token);

    const secretKey = process.env.JWT_KEY;

    const user = jwt.verify(tokenValidation, secretKey);

    delete user.iat;
    res.locals.user = user;
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }

  next();
}
