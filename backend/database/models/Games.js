import { DataTypes } from "sequelize";

export default sequelize => sequelize.define(
    "Game", {
        token: {
            type: DataTypes.STRING
        },
        carts: {
            type: DataTypes.STRING
        },
        players: {
            type: DataTypes.STRING
        },
        trump: {
            type: DataTypes.STRING
        },
        whoMove: {
            type: DataTypes.INTEGER
        },
        typeGame: {
            type: DataTypes.STRING
        },
        batleCarts: {
            type: DataTypes.STRING
        },
        winners: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        tableName: 'games'
    }
)