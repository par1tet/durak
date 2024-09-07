import { Cart } from "./cart";
import { Player } from "./player";
import { Suit } from "../enums/suit";

export abstract class Game{
    carts: Cart[] = []
    players: Player[] = []
    trump: Suit = Suit['rand']
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
        whoMove: number,
        typeGame: string,
        trumpCart: Cart | null,
        batleCards: (Cart | null)[]
    ){carts;players;trump;whoMove;typeGame;trumpCart;batleCards}
    // change batle cards
    changeBatleCards(indexOfBatleCard: number, cart: Cart): number {
        cart;
        indexOfBatleCard;return -1
    }
    // change def cards
    changeDefCards(indexOfBatleCard: number, cart: Cart): number{
        indexOfBatleCard;
        cart;
        return -1
    }
    // set who move
    setWhoMove(prevFunc: (prev:number) => number): void{prevFunc}
    // get next who move
    getNextWhoMove(prevFunc: (prev:number) => number): number{prevFunc;return 0}
    // clear batle cards
    clearBatleCarts(): void {}
    // is clean batle cards
    isCleanBatleCards(): boolean {return true}
    // replish cart for player
    replenishCards(playerIndex: number): void{playerIndex}
    // check is beaten cards on batle cards
    isBeaten(): boolean {return false}
    // check winners
    checkWinners(): void {}
    // check player is winner
    isWinner(player: Player): boolean{player;return false}
    // get def player
    getDefPlayerIndex(): number{ return 1 }
    // add def carts for battle cart
    addDefCart(indexOfBatleCard: number, cart: Cart){indexOfBatleCard;cart}
}