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


        players.push(new PlayerR(cartsForPlayer, !i))

        // Обьяснение !i
        // Конструкция !i - значит что мы преборазуем i к Boolean, а потом инвертуруем (ну точнее наоборот, но так лучше доходит)
        // Таким образом мы добиваемся того что при первой итерации, будет 0, и преобразуеться к true, при следуищих, к false
        // Благодаря этому только первый игрок получить true значение
    }

    return players
}