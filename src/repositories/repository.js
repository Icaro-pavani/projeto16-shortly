import db from "../db.js";

// users table functions
async function getUserByEmail(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function insertUser(name, email, passwordHash) {
  return db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, passwordHash]
  );
}

export const userRepository = { getUserByEmail, insertUser };

// links table functions
async function insertShortUrl(shortUrl, url, id) {
  return db.query(
    `INSERT INTO links ("shortUrl", url, "userId") VALUES ($1, $2, $3)`,
    [shortUrl, url, parseInt(id)]
  );
}

async function getShortUrlById(id) {
  return db.query(
    `SELECT id, "shortUrl", url, "userId" FROM links WHERE id = $1`,
    [parseInt(id)]
  );
}

async function getShortUrlByShortUrl(shortUrl) {
  return db.query(`SELECT * FROM links WHERE "shortUrl" = $1`, [shortUrl]);
}

async function updateShortVisitCount(shortUrl) {
  return db.query(
    `UPDATE links SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1`,
    [shortUrl]
  );
}

async function deleteShortById(id) {
  return db.query(`DELETE FROM links WHERE id = $1`, [parseInt(id)]);
}

async function getUrlsByUserId(id) {
  return db.query(
    `
      SELECT id, "shortUrl", url, "visitCount"
      FROM links
      WHERE "userId" = $1
    `,
    [parseInt(id)]
  );
}

export const urlRepository = {
  insertShortUrl,
  getShortUrlById,
  getShortUrlByShortUrl,
  updateShortVisitCount,
  deleteShortById,
  getUrlsByUserId,
};

// function for users with links

async function getUsersRanking() {
  return db.query(
    `
      SELECT u.id, u.name, COUNT(l."userId")::INT AS "linksCount", COALESCE(SUM(l."visitCount")::INT, 0) AS "visitCount"
      FROM users u
      LEFT JOIN links l ON l."userId" = u.id
      GROUP BY u.id
      ORDER BY "visitCount" DESC
      LIMIT 10
    `
  );
}

async function getUserWithVisitCount(id) {
  return db.query(
    `
      SELECT u.id, u.name, COALESCE(SUM(l."visitCount")::INT, 0) AS "visitCount"
      FROM users u
      LEFT JOIN links l ON l."userId" = u.id
      WHERE u.id = $1
      GROUP BY u.id
    `,
    [parseInt(id)]
  );
}

export const userLinkRepository = { getUsersRanking, getUserWithVisitCount };
