import { updateGame } from "../../database/functions.js"

export async function joinToGame(data, socket, io){
    await socket.join(data.token)

    console.log(data.carts != null && data.players != null && data.trumpCart != null && data.whoMove != null)

    if (data.carts != null && data.players != null && data.trumpCart != null && data.whoMove != null)
    {
        await updateGame(data.token, data.carts, data.players, data.trumpCart, data.whoMove)
    }

    await io.to(data.token).emit('joinNewPlayer', data)
}