import { Cart } from "../abstractClasses/cart";
import { Suit } from "../enums/suit";
import { Player } from "../abstractClasses/player";
import { toJS } from "mobx";
import axios from "axios";

export async function createGame(
    carts: Cart[],
    players: Player[],
    trump: Suit,
    whoMove: number,
    typeGame: string,
    trumpCart: Cart | null,
    maxPlayers: number
){
    console.log(carts.join('/'))
    console.log(players.join('|'))
    console.log(trump.toString())
    console.log((trumpCart as any).toString())
    let token:string = ''

    await axios.post('http://localhost:5000/creategame', {
        "carts": carts.join('/'),
        "players": players.join('|'),
        "trump": trump.toString(),
        "whoMove": whoMove,
        "typeGame": typeGame,
        "trumpCart": trumpCart == null ? (trumpCart as any).toString() : "0",
        "maxPlayers": maxPlayers
    })
    .then(r =>
        token = r.data
    )

    console.log(token)

    return token
}