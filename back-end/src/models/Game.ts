import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../db";
import moment from "moment-timezone";
import User from "./User";

const Game = sequelize.define("game", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    data: {
        type: DataTypes.NOW,
        allowNull: false,
        defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss')
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'RESTRIC',
        onUpdate: 'CASCADE',
        references: {
            model: 'users',
            key: 'id'
        }
    },
})

export default Game

// REFERENCE DB CREATE TABLE

// CREATE TABLE Game(
//     id integer NOT NULL AUTO_INCREMENT,
//     date DATETIME default CURRENT_TIMESTAMP,
//     score integer NOT null,
//     user_id integer NOT null,
//     CONSTRAINT PK_id PRIMARY KEY (id),
//     CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES user (id)
// )