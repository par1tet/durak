import axios from "axios";
import { Cart } from "../abstractClasses/cart";
import { CartR } from "../classes/cart";
import { Suit } from "../enums/suit";
import { fromNumberSuitToSuit } from "../functions/fromNumberSuitToSuit.ts";
import { Player } from "../abstractClasses/player.ts";
import { PlayerR } from "../classes/player.ts";

export async function getGameData(token: string){
    let result: any = {}

    await axios.post('http://localhost:5000/getgame', {
        token: token
    }).then(r => {
        result = r.data
    })

    const parseBatleCards: (Cart[] | null)[] = []

    for (let i = 0;i !== result.batleCarts.split('/').length;i++){
        if(result.batleCarts.split('/')[i] === '0'){
            parseBatleCards.push(null)
        }else{
            if(+result.batleCarts.split('/')[i].split('|').length === 1){
                parseBatleCards.push([
                    new CartR(fromNumberSuitToSuit(+result.batleCarts.split('/')[i].split(':')[1]),
                    +result.batleCarts.split('/')[i].split(':')[0]
                )])
            }else{
                parseBatleCards.push([
                    new CartR(fromNumberSuitToSuit(+result.batleCarts.split('/')[i].split('|')[0].split(':')[1]),
                    +result.batleCarts.split('/')[i].split('|')[0].split(':')[0]),
                    new CartR(fromNumberSuitToSuit(+result.batleCarts.split('/')[i].split('|')[0].split(':')[1]),
                    +result.batleCarts.split('/')[i].split('|')[0].split(':')[0])
                ])
            }
        }
    }

    result.batleCarts = parseBatleCards

    const parseCarts: Cart[] = []
    
    for (let i = 0;i !== result.carts.split('/').length;i++){
        parseCarts.push(
            new CartR(+result.carts.split('/')[i].split(':')[0],
            fromNumberSuitToSuit(+result.carts.split('/')[i].split(':')[1])
        ))
    }

    result.carts = parseCarts

    result.batleCarts = parseBatleCards

    const parsePlayers: Player[] = []

    console.log(result.players.split('|').length)
    console.log(result.players.split('|'))

    if(result.players.split('|').length === 1){
        const playerCarts: Cart[] = []

        for (let i = 0;i !== result.players.split('/').length;i++){
            playerCarts.push(
                new CartR(fromNumberSuitToSuit(+result.players.split('/')[i].split(':')[1]),
                +result.players.split('/')[i].split(':')[0])
            )
        }

        parsePlayers.push(new PlayerR(playerCarts, 'Игрок 1', fromNumberSuitToSuit(+result.trump)))
    }else{
        for (let i = 0;i !== result.players.split('|').length;i++){
            const playerCarts: Cart[] = []

            for (let j = 0;j !== result.players.split('|')[i].split('/').length;j++){
                playerCarts.push(
                    new CartR(fromNumberSuitToSuit(+result.players.split('|')[i].split('/')[j].split(':')[1]),
                    +result.players.split('|')[i].split('/')[j].split(':')[0]
                ))
            }
    
            parsePlayers.push(new PlayerR(playerCarts, `Игрок ${i+1}`, fromNumberSuitToSuit(+result.trump)))
        }
    }

    result.players = parsePlayers
    console.log(result)
    result.trump = fromNumberSuitToSuit((+result.trump))
    result.trumpCart = new CartR(fromNumberSuitToSuit(+result.trumpCart.split(':')[1]),
    +result.trumpCart.split(':')[0])

    return result
}