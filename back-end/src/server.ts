import express from "express";

import { Router, Request, Response } from "express";

const app = express();
const route = Router();

app.use(express.json());

route.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello" })
});

app.use(route);

app.listen(3000, () => "Servidor rodando na porta 3000");

