import { CartR } from "../classes/cart"
import { Suit } from "../enums/suit"

export function createCartsArray(countCarts: number): CartR[] {
    const carts: CartR[] = []



    for(let i = 14;i !== (14 - countCarts / 4);i--){
        for (let j = 0;j !== 4;j++){
            let currentSuit: string = Suit[j]
            switch(currentSuit){
                case 'diamonds':
                    carts.push(new CartR(Suit.diamonds, i))
                    break;
                case 'hearts':
                    carts.push(new CartR(Suit.hearts, i))
                    break;
                case 'spades':
                    carts.push(new CartR(Suit.spades, i))
                    break;
                case 'clubs':
                    carts.push(new CartR(Suit.clubs, i))
                    break;
            }
        }
    }

    return carts
}