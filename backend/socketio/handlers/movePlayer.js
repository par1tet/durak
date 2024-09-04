import { updateGame } from "../../database/functions.js";

export async function movePlayer(data, socket, io){
    await updateGame(data)

    console.log(data)

    await io.to(data.token).emit('moveOfPlayer', data)
}