import { nanoid } from "nanoid";
import db from "../db.js";

export async function postUrl(req, res) {
  try {
    const shortUrlLength = 8;
    const { url, user } = res.locals;
    const shortUrl = nanoid(shortUrlLength);

    const userRow = await db.query(`SELECT * FROM users WHERE id = $1`, [
      parseInt(user.id),
    ]);

    if (userRow.rows.length === 0) {
      return res.sendStatus(401);
    }

    await db.query(
      `INSERT INTO links ("shortUrl", url, "userId") VALUES ($1, $2, $3)`,
      [shortUrl, url, parseInt(user.id)]
    );

    res.status(201).send({ shortUrl });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getUrlById(req, res) {}
