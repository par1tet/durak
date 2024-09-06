import express from 'express'
import { router } from './routes/routes.js'
import cors from 'cors'
import  bodyParser  from 'body-parser'
import { createServer } from 'http'
import { Server } from "socket.io";
import { onConnection } from '../socketio/onConnection.js'
import { joinToGame } from '../socketio/handlers/joinToGame.js'
import { movePlayer } from '../socketio/handlers/movePlayer.js'
import 'dotenv/config.js'

const app = new express()
const PORT = 5000

const ALLOWED_ORIGIN = [process.env.ORIGIN]

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: ALLOWED_ORIGIN[0],
    serveClient: false
});

io.on('connection', socket => {
    onConnection(io, socket)
    socket.on('joinGame', async data => {
        await joinToGame(data, socket, io)
    })

    socket.on('movePlayer', async data => {
        await movePlayer(data, socket, io)
    })
})

const corsOptions = {
    origins: [ALLOWED_ORIGIN],
}

function logger(req, res, next){
    req.body ? console.log(req.body) : null
    next()
}

const urlencodedParser = bodyParser({
    extended: false,
});

app.use(urlencodedParser)
app.use(cors(corsOptions))
app.use(logger)
app.use('/', router)

httpServer.listen(PORT);
