import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../db";
import moment from "moment-timezone";
import User from "./User";

const Game = sequelize.define("Game", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        references: {
            model: 'users',
            key: 'id'
        }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
},
{
    tableName: 'games'
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