import { Suit } from "../enums/suit"

export abstract class Cart{
    suit: Suit = Suit['diamonds']
    level: number = 6

    canBeat(cart: Cart, trump: Suit): number{cart;trump;return 0}

    toString?(): string
}