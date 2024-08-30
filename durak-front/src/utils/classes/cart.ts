import { Cart } from "../abstractClasses/cart";
import { Suit } from "../enums/suit";

export class CartR extends Cart {
    constructor(suit: Suit, level: number){
        super();
        this.suit = suit
        this.level = level
    }

    canBeat(cart: Cart, trump: Suit): number{
        if (cart.level >= this.level || cart.suit !== this.suit){
            if(cart.suit !== trump && this.suit === trump)
                {return 0}
            else{return -1}
        }
        else
            {return 0}
    }
}