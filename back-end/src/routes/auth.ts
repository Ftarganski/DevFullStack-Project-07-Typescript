import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController";
const auth = Router();
const userCtrl = new UserController();

auth.post("/login", async (req: Request, res: Response) => {
    const result = await userCtrl.login(req.body);
    res.statusCode = result.status;
    res.json(result.data)
})

auth.post("/register", async (req: Request, res: Response) => {
    const result = await userCtrl.register(req.body);
    res.statusCode = result.status;
    res.json(result.data)
})

export default auth