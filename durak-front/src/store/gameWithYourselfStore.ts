import { makeAutoObservable } from "mobx";
import { Cart } from "../utils/abstractClasses/carts";
import { Trump } from "../utils/enums/trump";
import { Player } from "../utils/abstractClasses/player";

export class gameWithYourselfStore{
    carts: Cart[] = []
    players: Player[] = []
    trump: Trump = Trump['rand']
    timeForMove: string = '10m'
    scam: boolean = true
    whoMove: number = 0

    constructor(){
        makeAutoObservable(this)
    }

    createGameWithYourself(
            carts: Cart[],
            players: Player[],
            trump: Trump,
            timeForMove: string,
            scam: boolean,
            whoMove: number)
    {
        this.carts = carts
        this.players = players
        this.trump = trump
        this.timeForMove = timeForMove
        this.scam = scam
        this.whoMove = whoMove

        makeAutoObservable(this)
    }
}