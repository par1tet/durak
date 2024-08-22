import { Cart } from "../abstractClasses/cart";
import { Suit } from "../enums/suit";

export class CartR extends Cart {
    constructor(suit: Suit, level: number){
        super();
        this.suit = suit
        this.level = level
    }
}