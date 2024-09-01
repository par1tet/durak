import { Router } from "express";

export const router = new Router()

router.get('/', (req, res) => {
    res.send('hello world')
})

router.get('/test', (req, res) => {
    res.send({'test':'helo world'})
})