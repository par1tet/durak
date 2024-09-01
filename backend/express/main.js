import express from 'express'
import { router } from './routes/routes.js'
import cors from 'cors'
import  bodyParser  from 'body-parser'

const app = new express()
const PORT = 5000

var corsOptions = {
    origins: ['http://localhost:5173/'],
}

function logger(req, res, next){
    console.log(`Time: ${(new Date())}`)
    req.body ? console.log(req.body) : null
    console.log(req.method)
    console.log(req.url)
    next()
}

const urlencodedParser = bodyParser({
    extended: false,
});

app.use(urlencodedParser)
app.use(cors(corsOptions))
app.use(logger)
app.use('/', router)

app.listen(PORT)