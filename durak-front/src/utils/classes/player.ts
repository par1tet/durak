import { Player } from "../abstractClasses/player";
import { Cart } from "../abstractClasses/cart";

export class PlayerR extends Player{
    constructor(carts: Cart[]){
        super()
        this.carts = carts
    }
}