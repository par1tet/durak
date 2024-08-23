import { makeAutoObservable } from "mobx";
import { Cart } from "../utils/abstractClasses/cart";
import { CartR } from "../utils/classes/cart";
import { Player } from "../utils/abstractClasses/player";
import { Suit } from "../utils/enums/suit.ts";

export class gameWithYourselfStore{
    carts: Cart[] = []
    players: Player[] = []
    trump: Suit = Suit['rand']
    timeForMove: string = '10m'
    scam: boolean = true
    whoMove: number = 0
    typeGame: string = ''
    trumpCart: Cart | null = null
    batleCards: (Cart | null)[] = []

    constructor(){
        makeAutoObservable(this)
    }

    createGameWithYourself(
            carts: Cart[],
            players: Player[],
            trump: Suit,
            timeForMove: string,
            scam: boolean,
            whoMove: number,
            typeGame: string,
            trumpCart: Cart | null
        )
    {
        this.carts = carts
        this.players = players
        this.trump = trump
        this.timeForMove = timeForMove
        this.scam = scam
        this.whoMove = whoMove
        this.typeGame = typeGame
        this.trumpCart = trumpCart
        this.batleCards =
                        [null,null,null,
                        null,null,null]
    }

    changeBatleCards(indexOfBatleCard: number, cart: Cart){
        this.batleCards[indexOfBatleCard] = cart
    }
}