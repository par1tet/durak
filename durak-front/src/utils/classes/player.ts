import { Player } from "../abstractClasses/player";
import { Cart } from "../abstractClasses/cart";

export class PlayerR extends Player{
    constructor(carts: Cart[], nickName: string){
        super()
        this.carts = carts
        this.nickName = nickName
    }

    removeCart(cart: Cart): void {
        this.carts.filter(cartPl => `${cartPl.level}:${cartPl.suit}` !== `${cart.level}:${cart.suit}`)
        this.carts = this.carts.filter(cartPl => `${cartPl.level}:${cartPl.suit}` !== `${cart.level}:${cart.suit}`)
    }
}