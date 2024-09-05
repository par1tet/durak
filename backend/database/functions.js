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

export async function canToJoinToGame(token){
    const gamesWithToken = (await sequelize.models.Game.findAll({where: {
        token: token
    }}))[0]
    
    if (gamesWithToken.players.split('|').length !== gamesWithToken.maxPlayers
    ){
        return true;
    }else{
        return false
    }
}

export async function getDataGame(token){
    const gamesWithToken = (await sequelize.models.Game.findAll({where: {
        token: token
    }}))[0]

    return {
        carts: gamesWithToken.carts,
        players: gamesWithToken.players,
        trump: gamesWithToken.trump,
        whoMove: gamesWithToken.whoMove,
        typeGame: gamesWithToken.typeGame,
        batleCarts: gamesWithToken.batleCarts,
        winners: gamesWithToken.winners,
        maxPlayers: gamesWithToken.maxPlayers,
        trumpCart: gamesWithToken.trumpCart,
    }
}

export async function updateGame({token, carts, players, trumpCart, whoMove, batleCarts, winners}){
    const gamesWithToken = (await sequelize.models.Game.findAll({where: {
        token: token
    }}))[0]

    if(carts || carts === ''){
        gamesWithToken.carts = carts;
    }if(players){
        gamesWithToken.players = players;
    }if(trumpCart || trumpCart === ''){
        gamesWithToken.trumpCart = trumpCart;
    }if(whoMove || whoMove === 0){
        gamesWithToken.whoMove = whoMove;
    }if(batleCarts){
        gamesWithToken.batleCarts = batleCarts;
    }if(winners){
        gamesWithToken.winners = winners;
    }

    await gamesWithToken.save()
}