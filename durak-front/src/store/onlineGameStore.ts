import { makeObservable, observable, action } from "mobx";
import { GameR } from "../utils/classes/game.ts";
import { Suit } from "../utils/enums/suit.ts";
import { Player } from "../utils/abstractClasses/player.ts";
import { Cart } from "../utils/abstractClasses/cart.ts";

export class onlineGameStore extends GameR{
    token: string = '';
    maxPlayers: number = 2;
    pointOfView: number = 0;

    constructor(){
        super()
        makeObservable(this, {
            carts: observable,
            players: observable,
            trump: observable,
            whoMove: observable,
            typeGame: observable,
            trumpCart: observable,
            batleCards: observable,
            token: observable,
            maxPlayers: observable,
            changeBatleCards: action,
            changeDefCards: action,
            setWhoMove: action,
            getNextWhoMove: action,
            clearBatleCarts: action,
            isCleanBatleCards: action,
            replenishCards: action,
            isBeaten: action,
            checkWinners: action,
            isWinner: action,
            getDefPlayerIndex: action,
            addDefCart: action
        })
    }
    createOnlineGame(
        carts: Cart[],
        players: Player[],
        trump: Suit,
        whoMove: number,
        typeGame: string,
        trumpCart: Cart | null,
        token: string,
        maxPlayers: number,
        batleCards?: (Cart[] | null)[]
    ){
        this.carts = carts
        this.players = players
        this.trump = trump
        this.whoMove = whoMove
        this.typeGame = typeGame
        this.trumpCart = trumpCart
        this.batleCards = batleCards ?? [null,null,null,null,null,null]
        this.token = token
        this.maxPlayers = maxPlayers
    }

    setPointOfView(value: number){
        this.pointOfView = value
    }
}