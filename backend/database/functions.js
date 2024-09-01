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

export async function createGame(token){
    sequelize.models.Game.create({token:token})
}

export async function getGames(token){
    return (await sequelize.models.Game.findAll())
}