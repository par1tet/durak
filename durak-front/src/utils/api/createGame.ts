import { Cart } from "../abstractClasses/cart";
import { Suit } from "../enums/suit";
import { Player } from "../abstractClasses/player";
import axios from "axios";
import { SERVER_URL } from "./serverUrl";

export async function createGame(
    carts: Cart[],
    players: Player[],
    trump: Suit,
    whoMove: number,
    typeGame: string,
    trumpCart: Cart | null,
    maxPlayers: number
){
    let token:string = ''

    await axios.post(SERVER_URL('/creategame'), {
        "carts": carts.join('/'),
        "players": players.join('|'),
        "trump": trump.toString(),
        "whoMove": whoMove,
        "typeGame": typeGame,
        "trumpCart": trumpCart == null ? "" : (trumpCart as any).toString(),
        "maxPlayers": maxPlayers
    })
    .then(r =>
        token = r.data
    )

    return token
}