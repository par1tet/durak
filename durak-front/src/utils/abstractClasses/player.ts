import { Cart } from "./cart.ts"
import { Suit } from "../enums/suit.ts"

export abstract class Player{
    carts: Cart[] = []
    currentMove: boolean = false
    nickName: string = ''
    isWin: boolean = false

    removeCart(cart: Cart): void {cart}
    sortCarts(trump: Suit): void {trump}

    toString?(): string
}