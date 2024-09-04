import { updateGame } from "../../database/functions.js"

export async function joinToGame(data, socket, io){
    await socket.join(data.token)

    await updateGame({
        token: data.token,
        carts: data.carts,
        players: data.players,
        trumpCart: data.trumpCart,
        whoMove: data.whoMove
    })

    await io.to(data.token).emit('joinNewPlayer', data)
}