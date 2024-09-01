import { Cart } from "../abstractClasses/cart";
import { Suit } from "../enums/suit";
import { Player } from "../abstractClasses/player";
import { toJS } from "mobx";
import axios from "axios";

export function createGame(
    carts: Cart[],
    players: Player[],
    trump: Suit,
    whoMove: number,
    typeGame: string,
    trumpCart: Cart | null
){
    console.log(carts.join('/'))
    console.log(players.join('|'))
    console.log(trump.toString())
    console.log((trumpCart as any).toString())

    axios.post('http://localhost:5000/creategame', {
        "carts": carts.join('/'),
        "players": players.join('|'),
        "trump": trump.toString(),
        "whoMove": whoMove,
        "typeGame": typeGame,
        "trumpCart": trumpCart == null ? (trumpCart as any).toString() : "0"
    })
    .then(r => console.log(r.data))
}