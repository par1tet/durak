import { Cart } from "../abstractClasses/cart"
import { Player } from "../abstractClasses/player"
import { PlayerR } from "../classes/player"
import { Suit } from "../enums/suit"

export function createPlayersArray(countPlayrs: number, carts: Cart[], trump: Suit, nickNames?: string[]): Player[] {
    const players: Player[] = []

    console.log(countPlayrs)
    console.log(carts)
    console.log(trump)

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

        if(nickNames === undefined){
            players.push(new PlayerR(cartsForPlayer, `Игрок ${i+1}`, trump))
        }else{
            players.push(new PlayerR(cartsForPlayer, nickNames[i], trump))
        }
    }

    return players
}