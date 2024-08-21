import { Cart } from "./carts.ts"

export abstract class Player{
    carts: Cart[] = []
    currentMove: boolean = false

}