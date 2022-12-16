import { Sequelize } from "sequelize";
import "dotenv/config";

const DB_NAME: string = process.env.DB_NAME || "genius_game";
const DB_USER: string = process.env.DB_USER || "root";
const DB_PASS: string = process.env.DB_PASS || "12345678";
const DB_HOST: string = process.env.DB_HOST || "localhost";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect: 'mysql',
    host: DB_HOST

})

export { sequelize }