import { Player } from "../utils/abstractClasses/player.ts";
import { Cart } from "../utils/abstractClasses/cart.ts";

export class playerCartStore {
    currentCart: Cart | null = null
    currentPlayer: Player | null = null

    constructor(){
        this.currentCart = null
        this.currentPlayer = null
    }

    changeCurrent(currentCart: Cart | null, currentPlayer: Player | null){
        this.currentCart = currentCart
        this.currentPlayer = currentPlayer
    }
}