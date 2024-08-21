import { CartR } from "../classes/cart"
import { Trump } from "../enums/trump"

export function createCartsArray(countCarts: number): CartR[] {
    const carts: CartR[] = []



    for(let i = 14;i !== (14 - countCarts / 4);i--){
        for (let j = 0;j !== 4;j++){
            let currentSuit: string = Trump[j]
            switch(currentSuit){
                case 'diamonds':
                    carts.push(new CartR(Trump.diamonds, i))
                    break;
                case 'hearts':
                    carts.push(new CartR(Trump.hearts, i))
                    break;
                case 'spades':
                    carts.push(new CartR(Trump.spades, i))
                    break;
                case 'clubs':
                    carts.push(new CartR(Trump.clubs, i))
                    break;
            }
        }
    }

    return carts
}