import { Suit } from "../enums/suit"

export function fromNumberSuitToSuit(numberSuit: number): Suit{
    switch (numberSuit){
        case 0:
            return Suit['diamonds']
        case 1:
            return Suit['hearts']
        case 2:
            return Suit['clubs']
        case 3:
            return Suit['spades']
        default:
            return Suit['rand']
    }
}