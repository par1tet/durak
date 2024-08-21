import { Player } from "../abstractClasses/player";
import { Cart } from "../abstractClasses/cart";

export class PlayerR extends Player{
    constructor(carts: Cart[], currentMove: boolean){
        super()
        this.carts = carts
        this.currentMove = currentMove
    }
}