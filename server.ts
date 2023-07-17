import express, { Request, Response } from "express";

const app = express();

const PORT = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Your are listening on port ${PORT}`));
