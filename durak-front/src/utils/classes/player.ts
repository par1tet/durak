import { Player } from "../abstractClasses/player";
import { Cart } from "../abstractClasses/cart";
import { Suit } from "../enums/suit";

export class PlayerR extends Player{
    constructor(carts: Cart[], nickName: string, trump: Suit){
        super()
        this.carts = carts
        this.nickName = nickName
        this.sortCarts(trump)
    }

    removeCart(cart: Cart): void {
        this.carts = this.carts.filter(cartPl => `${cartPl.level}:${cartPl.suit}` !== `${cart.level}:${cart.suit}`)
    }

    sortCarts(trump: Suit): void {
        const tempCarts = this.carts
        temoCarts.sort((cartA: Cart, cartB: Cart) => cartB.level - cartA.level)
        .sort((cartA: Cart, cartB: Cart) => {
            cartA;
            if (cartB.suit === trump){
                return 1
            }else{
                return -1
            }
        } )
        .sort((cartA: Cart, cartB: Cart) => {
            if (cartA.suit === trump || cartB.suit === trump){
                return 0
            }
            return cartB.level - cartA.level
        })
        this.carts = Array.from(new Set(tempCarts))
    }

    toString(): string {
        return this.carts.join('/')
    }
}