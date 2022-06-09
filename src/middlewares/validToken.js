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

    const userResult = await db.query(
      `
        SELECT u.id, u.name, SUM(l."visitCount")::INT as "visitCount"
        FROM users u
        JOIN links l ON l."userId" = u.id
        WHERE u.id = $1
        GROUP BY u.id
      `,
      [parseInt(user.id)]
    );

    if (userResult.rows.length === 0) {
      return res.sendStatus(404);
    }

    delete user.iat;
    res.locals.user = userResult.rows[0];
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }

  next();
}
