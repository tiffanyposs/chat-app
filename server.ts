import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();

const { HTTP_PORT } = process.env;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(HTTP_PORT, () =>
  console.log(`Your are listening on port ${HTTP_PORT}`)
);
