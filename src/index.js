import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import urlsRouter from "./routes/urlsRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(urlsRouter);

app.listen(process.env.PORT, () => {
  console.log("App online on port " + process.env.PORT);
});
