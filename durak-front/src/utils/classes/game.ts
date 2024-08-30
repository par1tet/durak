import { Game } from "../abstractClasses/game";
import { Cart } from "../abstractClasses/cart";
import { Player } from "../abstractClasses/player";
import { Suit } from "../enums/suit";

export class GameR extends Game {
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
    }

    createGame(
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
        if (this.typeGame !== 'translating'){
            if (this.batleCards[indexOfBatleCard] === null) return -1
            if (this.batleCards[indexOfBatleCard][0].level > cart.level && this.trump !== cart.suit) return -1
    
            this.batleCards[indexOfBatleCard][1] = cart
            return 0
        }else{
            if (this.batleCards[indexOfBatleCard] === null) {
                for (let i = 0;i !== this.batleCards.length;i++) {
                    if (!(this.batleCards[i])) {continue}
                    if (this.batleCards[i]?.length === 2) return -1

                    if ((this.batleCards[i] as any)[0].level === cart.level){
                        (this.batleCards[indexOfBatleCard] as any) = [cart]
                        return 1
                    }
                }
                return -1
            }else{
                if (this.batleCards[indexOfBatleCard][0].level > cart.level && this.trump !== cart.suit || cart.suit !== this.batleCards[indexOfBatleCard][0].suit) return -1
    
                this.batleCards[indexOfBatleCard][1] = cart
                return 0
            }
        }

    }

    setWhoMove(prevFunc: (prev:number) => number): void{
        const newValue = prevFunc(this.whoMove)

        if(newValue >= this.players.length || newValue < 0){
            this.whoMove = newValue - this.players.length
            return
        }

        this.whoMove = newValue
    }

    getNextWhoMove(prevFunc: (prev:number) => number): number{
        const newValue = prevFunc(this.whoMove)

        if(newValue >= this.players.length || newValue < 0){
            return newValue - this.players.length
        }

        return newValue
    }

    clearBatleCarts(): void {
        for(let i = 0;i !== this.batleCards.length;i++) {
            this.batleCards[i] = null
        }
    }

    isCleanBatleCards(): boolean {
        let isClean: boolean = true
        for(let i = 0;i !== this.batleCards.length;i++) {
            if (this.batleCards[i]){
                isClean = false
            }
        }
        return isClean
    }

    replenishCards(playerIndex: number): void{
        if (this.players[playerIndex].carts.length < 6) {
            const countCartMissing = (6 - this.players[playerIndex].carts.length)
            for (let i:number = 0;i !== countCartMissing;i++){
                if(this.carts.length){
                    this.players[playerIndex].carts.push((this.carts.pop() as any))
                }else{
                    if(this.trumpCart){
                        this.players[playerIndex].carts.push(this.trumpCart)
                        this.trumpCart = null
                    }
                    break
                }
            }
        }
    }

    isBeaten(): boolean{
        if(this.isCleanBatleCards()) return false
        let isClean: boolean = true
        for(let i = 0;i !== this.batleCards.length;i++) {
            if (this.batleCards[i]){
                if (this.batleCards[i]?.length === 1){
                    isClean = false
                }
            }
        }
        return isClean
    }

    checkWinners() {
        this.players.forEach((player: Player, index: number) => {
            if(player.carts.length === 0 && this.carts.length === 0 && !(this.trumpCart) && !(player.isWin)){
                player.isWin = true
                this.winners.push(player)
            }
        })
    }

    isWinner(player: Player): boolean{
        if(this.winners.length === 0){
            return false
        }
        let result: boolean = false;

        if(this.winners.filter((playerW: Player) => playerW === player).length === 1){
            result = true
        }

        return result
    }

    getDefPlayerIndex(): number{
        for(let i = 1;;i++){
            if (!(this.players[this.getNextWhoMove(prev => prev + i)].isWin)){
                return this.getNextWhoMove(prev => prev + i)
            }
        }
    }

    addDefCart(indexOfBatleCard: number, cart: Cart): void {
        if(this.batleCards[indexOfBatleCard] === null || this.batleCards[indexOfBatleCard]?.length === 2) return;
        
        this.batleCards[indexOfBatleCard][1] = cart;
    }
}