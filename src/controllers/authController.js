import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import db from "../db.js";

dotenv.config();

export async function signUp(req, res) {
  try {
    const SALT = 10;
    const { signUpBody } = res.locals;
    const { name, email, password } = signUpBody;
    const checkUser = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (checkUser.rows.length > 0) {
      return res.status(422).send("E-mail already in use!");
    }

    const passwordHash = bcrypt.hashSync(password, SALT);
    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, passwordHash]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  try {
    const { signInBody } = res.locals;
    const { email, password } = signInBody;
    const registeredUser = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (
      registeredUser.rows.length > 0 &&
      bcrypt.compareSync(password, registeredUser.rows[0].password)
    ) {
      const secretKey = process.env.JWT_KEY;
      const data = {
        id: registeredUser.rows[0].id,
        name: registeredUser.rows[0].name,
      };
      const token = jwt.sign(data, secretKey);

      return res.status(200).send({ token });
    }

    return res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
