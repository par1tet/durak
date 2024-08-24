import { makeAutoObservable } from "mobx";
import { Cart } from "../utils/abstractClasses/cart";
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
    batleCards: (Cart[] | null)[] = []

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

    changeBatleCards(indexOfBatleCard: number, cart: Cart): number{
        let isEmptyBatleCards: boolean = true;
        this.batleCards.forEach(cartBatle => {if(cartBatle !== null){isEmptyBatleCards = false}})

        if(isEmptyBatleCards){
            this.batleCards[indexOfBatleCard] = []
            this.batleCards[indexOfBatleCard][0] = cart

            return 0;
        }else{
            let isCanMove: boolean = false;

            this.batleCards.forEach((cartBatle: Cart[] | null) => {
                if(cartBatle === null) return 0
                if(cartBatle[0].level === cart.level){
                    isCanMove = true
                }
                if(cartBatle.length === 2){
                    if(cartBatle[1].level === cart.level){
                        isCanMove = true
                    }
                }
            })
            if(isCanMove){
                this.batleCards[indexOfBatleCard] = []
                this.batleCards[indexOfBatleCard][0] = cart

                return 0;
            }else {
                return -1;
            }
        }
    }

    changeDefCards(indexOfBatleCard: number, cart: Cart): number{
        if (this.batleCards[indexOfBatleCard] === null) return -1
        if (this.batleCards[indexOfBatleCard][0].level > cart.level && this.trump !== cart.suit) return -1

        this.batleCards[indexOfBatleCard][1] = cart
        return 0
    }

    setWhoMove(prevFunc: (prev:number) => number){
        const newValue = prevFunc(this.whoMove)

        if(newValue >= this.players.length || newValue < 0){
            this.whoMove = 0
            return
        }

        this.whoMove = newValue
    }
}