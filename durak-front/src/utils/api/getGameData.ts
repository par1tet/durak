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
                    new CartR(fromNumberSuitToSuit(+result.batleCarts.split('/')[i].split('|')[1].split(':')[1]),
                    +result.batleCarts.split('/')[i].split('|')[1].split(':')[0])
                ])
            }
        }
    }

    result.batleCarts = parseBatleCards

    const parseCarts: Cart[] = []

    console.log(result.carts.split('/')[0])
    console.log(result.carts.split('/'))
    console.log(result.carts)
    
    if(result.carts.split('/')[0] !== ''){
        for (let i = 0;i !== result.carts.split('/').length;i++){
            parseCarts.push(
                new CartR(fromNumberSuitToSuit(+result.carts.split('/')[i].split(':')[1]),
                +result.carts.split('/')[i].split(':')[0])
            )
        }
    }


    result.carts = parseCarts
    console.log(parseCarts)

    result.batleCarts = parseBatleCards

    const parsePlayers: Player[] = []

    console.log(result.players.split('|').length)
    console.log(result.players.split('|'))

    if(result.players.split('|').length === 1){
        parsePlayers.push(new PlayerR(result.players.split('/').map((cart: string) => {
            return (
                new CartR(fromNumberSuitToSuit(+cart.split(':')[1]),
                +(cart.split(':'))[0]
            ))
        }), 'Игрок 1', fromNumberSuitToSuit(+result.trump)))
    }else{
        for (let i = 0;i !== result.players.split('|').length;i++){
            if(result.players.split('|')[i] === '0'){
                parsePlayers.push(new PlayerR([], `Игрок ${i+1}`, fromNumberSuitToSuit(+result.trump)))
            }else{
                parsePlayers.push(new PlayerR(result.players.split('|')[i].split('/').map((cart: string) => {
                    return (
                        new CartR(fromNumberSuitToSuit(+cart.split(':')[1]),
                        +(cart.split(':'))[0]
                    ))
                }), `Игрок ${i+1}`, fromNumberSuitToSuit(+result.trump)))
            }
        }
    }

    result.players = parsePlayers
    console.log(result)
    result.trump = fromNumberSuitToSuit((+result.trump))
    if(result.trumpCart){
        result.trumpCart = new CartR(fromNumberSuitToSuit(+result.trumpCart.split(':')[1]),
        +result.trumpCart.split(':')[0])
    }

    return result
}