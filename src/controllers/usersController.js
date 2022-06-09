import db from "../db.js";

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const { user } = res.locals;

    if (parseInt(id) !== parseInt(user.id)) {
      return res.sendStatus(401);
    }

    const shortenedUrlsResult = db.query(
      `
            SELECT id, "shortUrl", url, "visitCount"
            FROM links
            WHERE "userId" = $1
          `,
      [parseInt(id)]
    );

    const shortenedUrls = (await shortenedUrlsResult).rows;

    res.status(200).send({ ...user, shortenedUrls });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
