import { Router } from "express";
import { createGame, getGames } from "../../database/functions.js";
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
        req.body.body
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