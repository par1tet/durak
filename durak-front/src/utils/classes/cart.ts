import { Cart } from "../abstractClasses/cart";
import { Trump } from "../enums/trump";

export class CartR extends Cart {
    constructor(suit: Trump, level: number){
        super();
        this.suit = suit
        this.level = level
    }
}