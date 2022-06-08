import { nanoid } from "nanoid";
import db from "../db.js";

export async function postUrl(req, res) {
  try {
    const shortUrlLength = 8;
    const { url, user } = res.locals;
    const shortUrl = nanoid(shortUrlLength);

    const userResult = await db.query(`SELECT * FROM users WHERE id = $1`, [
      parseInt(user.id),
    ]);

    if (userResult.rows.length === 0) {
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

export async function getUrlById(req, res) {
  try {
    const { id } = req.params;

    const shortResult = await db.query(
      `SELECT id, "shortUrl", url FROM links WHERE id = $1`,
      [parseInt(id)]
    );

    if (shortResult.rows.length === 0) {
      return res.sendStatus(404);
    }

    res.status(200).send(shortResult.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function openShortUrl(req, res) {
  try {
    const { shortUrl } = req.params;

    const linkResult = await db.query(
      `SELECT * FROM links WHERE "shortUrl" = $1`,
      [shortUrl]
    );

    if (linkResult.rows.length === 0) {
      return res.sendStatus(404);
    }

    await db.query(
      `UPDATE links SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1`,
      [shortUrl]
    );

    res.redirect(linkResult.rows[0].url);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteShortUrl(req, res) {
  try {
    const { id } = req.params;
    const { user } = res.locals;

    const shortResult = await db.query(`SELECT * FROM links WHERE id = $1`, [
      parseInt(id),
    ]);

    if (shortResult.rows.length === 0) {
      return res.sendStatus(404);
    }

    if (shortResult.rows[0].userId !== user.id) {
      return res.sendStatus(401);
    }

    await db.query(`DELETE FROM links WHERE id = $1`, [parseInt(id)]);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
