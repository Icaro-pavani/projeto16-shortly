import bcrypt from "bcrypt";

import db from "../db.js";

export async function signUp(req, res) {
  try {
    const SALT = 10;
    const { signUpBody } = res.locals;
    const { name, email, password } = signUpBody;
    const checkUser = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

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
