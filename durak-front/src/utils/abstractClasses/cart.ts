import { Suit } from "../enums/suit"

export abstract class Cart{
    suit: Suit = Suit['diamonds']
    level: number = 6
}