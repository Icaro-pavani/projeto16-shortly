import { nanoid } from "nanoid";

import { urlRepository } from "../repositories/repository.js";

export async function postUrl(req, res) {
  try {
    const shortUrlLength = 8;
    const { body, user } = res.locals;
    const { url } = body;
    const shortUrl = nanoid(shortUrlLength);

    await urlRepository.insertShortUrl(shortUrl, url, user.id);

    res.status(201).send({ shortUrl });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getUrlById(req, res) {
  try {
    const { id } = req.params;

    const shortResult = await urlRepository.getShortUrlById(id);

    if (shortResult.rows.length === 0) {
      return res.sendStatus(404);
    }

    const shortUrl = { ...shortResult.rows[0] };
    delete shortUrl.userId;

    res.status(200).send(shortUrl);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function openShortUrl(req, res) {
  try {
    const { shortUrl } = req.params;

    const linkResult = await urlRepository.getShortUrlByShortUrl(shortUrl);

    if (linkResult.rows.length === 0) {
      return res.sendStatus(404);
    }

    await urlRepository.updateShortVisitCount(shortUrl);

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

    const shortResult = await urlRepository.getShortUrlById(id);

    if (shortResult.rows.length === 0) {
      return res.sendStatus(404);
    }

    if (shortResult.rows[0].userId !== user.id) {
      return res.sendStatus(401);
    }

    await urlRepository.deleteShortById(id);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
