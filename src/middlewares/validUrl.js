import { stripHtml } from "string-strip-html";

import urlSchema from "../schemas/urlSchema.js";

export default async function validUrl(req, res, next) {
  try {
    const { url } = req.body;
    const urlValidation = await urlSchema.validateAsync(
      stripHtml(url).result.trim()
    );

    res.locals.url = urlValidation;
  } catch (error) {
    console.log(error);
    return res.status(422).send(error.message);
  }

  next();
}
