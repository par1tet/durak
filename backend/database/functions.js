import { Sequelize, DataTypes, Model } from 'sequelize'
import createGames from './models/Games.js';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

createGames(sequelize)

sequelize.sync()

export async function initDB(){
    console.log(sequelize.models.Game)
}

export async function createGame(
    token,
    carts,
    players,
    trump,
    whoMove,
    typeGame,
    trumpCart,
    maxPlayers
){
    sequelize.models.Game.create({
        token: token,
        carts: carts,
        players, players,
        trump: trump,
        whoMove: whoMove,
        typeGame: typeGame,
        trumpCart: trumpCart,
        batleCarts: "0/0/0/0/0/0",
        winners: "",
        maxPlayers: maxPlayers
    })
}

export async function getGames(token){
    return (await sequelize.models.Game.findAll())
}