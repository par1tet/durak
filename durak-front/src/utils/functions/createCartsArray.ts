import { CartR } from "../classes/cart"
import { Trump } from "../enums/trump"

export function createCartsArray(countCarts: number): CartR[] {
    const carts: CartR[] = []

    for(let i = 0;i !== countCarts;i++){
        carts.push(new CartR(Trump['clubs'], 6))
    }

    return carts
}