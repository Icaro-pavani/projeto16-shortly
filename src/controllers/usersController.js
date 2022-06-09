import {
  urlRepository,
  userLinkRepository,
} from "../repositories/repository.js";

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const { user } = res.locals;

    if (parseInt(id) !== parseInt(user.id)) {
      return res.sendStatus(401);
    }

    const shortenedUrlsResult = await urlRepository.getUrlsByUserId(id);

    const shortenedUrls = shortenedUrlsResult.rows;

    res.status(200).send({ ...user, shortenedUrls });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const rankingResult = await userLinkRepository.getUsersRanking();

    res.status(200).send(rankingResult.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
