import { Router, Request, Response } from "express";

const game = Router();

game.get("/score", async (req: Request, res: Response) => {
    res.json({ message: "=== GENERAL SCORE ===" })
})

game.get("/score/:id", async (req: Request, res: Response) => {
    res.json({ message: "=== USER SCORE ===" })
})

game.post("/score", async (req: Request, res: Response) => {
    res.json({ message: "=== NEW SCORE ===" })
})

export default game