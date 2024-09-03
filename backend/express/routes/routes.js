import { Router } from "express";
import { createGame, getGames, canToJoinToGame, getDataGame } from "../../database/functions.js";
import crypto from 'crypto'

export const router = new Router()

router.get('/', (req, res) => {
    res.send('hello world')
})

router.post('/creategame', async (req, res) => {
    const token = crypto.randomBytes(8).toString('hex').toUpperCase()
    console.log(req.body.trumpCart)
    await createGame(
        token,
        req.body.carts,
        req.body.players,
        req.body.trump,
        req.body.whoMove,
        req.body.typeGame,
        req.body.trumpCart,
        req.body.maxPlayers
    )
    // await (await getGames()).forEach(game => {
    //     console.log(game.id)
    //     console.log(game.token)
    //     console.log(game.players)
    //     console.log(game.trump)
    //     console.log(game.whoMove)
    //     console.log(game.typeGame)
    //     console.log(game.batleCarts)
    //     console.log(game.winners)
    // })
    res.send({'token':token})
})

router.post('/jointogame', async (req, res) => {
    console.log('token', req.body.token)

    res.send({'result':(await canToJoinToGame(req.body.token))})
})

router.post('/getgame', async (req, res) => {
    res.send((await getDataGame(req.body.token)))
})