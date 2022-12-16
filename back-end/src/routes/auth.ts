import { Router, Request, Response } from "express";

const auth = Router();

auth.post("/login", async (req: Request, res: Response) => {
    res.json({ message: "=== LOGIN ===" })
})

auth.post("/register", async (req: Request, res: Response) => {
    res.json({ message: "=== REGISTER ===" })
})

export default auth