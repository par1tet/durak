import { Cart } from "./cart";
import { Player } from "./player";
import { Suit } from "../enums/suit";

export abstract class Game{
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

    // init game
    createGame(
        carts: Cart[],
        players: Player[],
        trump: Suit,
        timeForMove: string,
        scam: boolean,
        whoMove: number,
        typeGame: string,
        trumpCart: Cart | null
    ){}
    // change batle cards
    changeBatleCards(indexOfBatleCard: number, cart: Cart): number {return -1}
    // change def cards
    changeDefCards(indexOfBatleCard: number, cart: Cart): number{return -1}
    // set who move
    setWhoMove(prevFunc: (prev:number) => number): void{}
    // get next who move
    getNextWhoMove(prevFunc: (prev:number) => number): number{return 0}
    // clear batle cards
    clearBatleCarts(): void {}
    // is clean batle cards
    isCleanBatleCards(): boolean {return true}
    // replish cart for player
    replenishCards(playerIndex: number): void{}
    // check is beaten cards on batle cards
    isBeaten(): boolean {return false}
    // check winners
    checkWinners(): void {}
    // check player is winner
    isWinner(player: Player): boolean{return false}
    // get def player
    getDefPlayerIndex(): number{ return 1 }
}