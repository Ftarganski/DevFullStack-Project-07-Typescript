"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require("dotenv/config");
const DB_NAME = process.env.DB_NAME || "";
const DB_USER = process.env.DB_USER || "";
const DB_PASS = process.env.DB_PASS || "";
const DB_HOST = process.env.DB_HOST || "";
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect: 'mysql',
    host: DB_HOST
});
exports.sequelize = sequelize;
