import { nanoid } from "nanoid";
import db from "../db";

export async function postUrl(req, res) {
  try {
    const shortUrlLength = 6;
    const { url, userId } = res.locals;
    const shortUrl = nanoid(shortUrlLength);
    console.log(shortUrl);

    await db.query(
      `INSERT INTO links ("shortUrl, url, "userId") VALUES ($1, $2, $3)`,
      [shortUrl, url, userId]
    );

    res.status(201).send({ shortUrl });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
