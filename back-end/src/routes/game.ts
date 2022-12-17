import { Router, Request, Response } from "express";
import GameController from "../controllers/GameController";
const game = Router();
const gameCtrl = new GameController();

game.get("/score", async (req: Request, res: Response) => {
    const result = await gameCtrl.getScore(null, req.query);
    res.statusCode = result.status;
    res.json(result.data)
});

game.get("/score/:id", async (req: Request, res: Response) => {
    const result = await gameCtrl.getScore(parseInt(req.params.id), req.query);
    res.statusCode = result.status;
    res.json(result.data)
});

game.post("/score", async (req: Request, res: Response) => {
    const result = await gameCtrl.addScore(req.body);
    res.statusCode = result.status;
    res.json(result.data)
});

export default game;