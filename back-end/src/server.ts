import express, { Router, Request, Response } from "express";
import cors from 'cors';

// ROUTES
import {auth} from './routes/auth';

// DATABASE
import { sequelize } from "./db";

const app = express();
const route = Router();

app.use(cors());
app.use(express.json());

route.get("/", (req: Request, res: Response) => {
    res.json({ message: "System OK" })
});

app.use(route);
app.use('/auth', auth);
sequelize.sync()

app.listen(3000, () => "Servidor rodando na porta 3000");