import { Cart } from "../abstractClasses/cart"
import { Player } from "../abstractClasses/player"
import { PlayerR } from "../classes/player"

export function createPlayersArray(countPlayrs: number, carts: Cart[]): Player[] {
    const players: Player[] = []

    for(let i = 0;i !== countPlayrs;i++){
        const cartsForPlayer: Cart[] = []

        for (let j = 0;j !== 6;j++){
            const lastCart = carts.pop()
            if (lastCart){
                cartsForPlayer.push(lastCart)
            }else{
                throw new Error('There werent enough cards for all the players')
            }
        }


        players.push(new PlayerR(cartsForPlayer))
    }

    return players
}