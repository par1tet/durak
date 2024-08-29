import { makeAutoObservable } from "mobx";
import { Cart } from "../utils/abstractClasses/cart";
import { Player } from "../utils/abstractClasses/player";
import { Suit } from "../utils/enums/suit.ts";
import { GameR } from "../utils/classes/game.ts";

export class gameWithYourselfStore extends GameR{
    carts: Cart[] = []
    players: Player[] = []
    trump: Suit = Suit['rand']
    timeForMove: string = '10m'
    scam: boolean = true
    whoMove: number = 0
    typeGame: string = ''
    trumpCart: Cart | null = null
    batleCards: (Cart[] | null)[] = []
    winners: Player[] = []

    constructor(){
        super()
        makeAutoObservable(this)
    }
}