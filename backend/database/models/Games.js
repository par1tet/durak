import { DataTypes } from "sequelize";

export default sequelize => sequelize.define(
    "Game", {
        token: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        tableName: 'games'
    }
)