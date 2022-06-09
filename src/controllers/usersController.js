import db from "../db.js";

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const { user } = res.locals;

    if (parseInt(id) !== parseInt(user.id)) {
      return res.sendStatus(401);
    }

    const shortenedUrlsResult = await db.query(
      `
            SELECT id, "shortUrl", url, "visitCount"
            FROM links
            WHERE "userId" = $1
          `,
      [parseInt(id)]
    );

    const shortenedUrls = shortenedUrlsResult.rows;

    res.status(200).send({ ...user, shortenedUrls });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const rankingResult = await db.query(
      `
       SELECT u.id, u.name, COUNT(l."userId")::INT AS "linksCount", COALESCE(SUM(l."visitCount")::INT, 0) AS "visitCount"
       FROM users u
       LEFT JOIN links l ON l."userId" = u.id
       GROUP BY u.id
       ORDER BY "visitCount" DESC
       LIMIT 10
      `
    );

    res.status(200).send(rankingResult.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
