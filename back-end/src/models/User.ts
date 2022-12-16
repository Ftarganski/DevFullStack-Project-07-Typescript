import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../db";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true

    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
})

export default User