import { Router } from "express";
import { createGame, getGames, canToJoinToGame, getDataGame } from "../../database/functions.js";
import crypto from 'crypto'

export const router = new Router()

router.get('/', (req, res) => {
    res.send('hello world')
})

router.post('/creategame', async (req, res) => {
    const token = crypto.randomBytes(8).toString('hex').toUpperCase()
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
    res.send({'token':token})
})

router.post('/jointogame', async (req, res) => {
    console.log('token', req.body.token)

    try{
        res.send({'result':(await canToJoinToGame(req.body.token))})
    }catch{
        res.send({'result':'not found'})
    }
})

router.post('/getgame', async (req, res) => {
    res.send((await getDataGame(req.body.token)))
})