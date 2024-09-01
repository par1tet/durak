import { Router } from "express";
import { initDB, createGame, getGames } from "../../database/functions.js";
import crypto from 'crypto'

export const router = new Router()

router.get('/', (req, res) => {
    res.send('hello world')
})

router.get('/test', async (req, res) => {
    await createGame(crypto.randomBytes(8).toString('hex').toUpperCase())
    await (await getGames()).forEach(game => {
        console.log(game.id)
        console.log(game.token)
    })
    res.send({'test':'helo world'})
})