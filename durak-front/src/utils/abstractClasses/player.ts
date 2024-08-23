import { Cart } from "./cart.ts"

export abstract class Player{
    carts: Cart[] = []
    currentMove: boolean = false
    nickName: string = ''

    removeCart(cart: Cart): void {}
}