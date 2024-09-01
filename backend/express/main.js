import express from 'express'
import { router } from './routes/routes.js'
import cors from 'cors'

const app = new express()
const PORT = 5000

var corsOptions = {
    origins: ['http://localhost:5173/'],
}

function logger(req, res, next){
    console.log(`Time: ${(new Date())}`)
    console.log(req.body)
    console.log(req.method)
    console.log(req.url)
    next()
}

app.use(cors(corsOptions))
app.use(logger)
app.use('/', router)

app.listen(PORT)