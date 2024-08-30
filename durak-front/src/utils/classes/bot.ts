import { Bot } from "../abstractClasses/bot";
import { Player } from "../abstractClasses/player";
import { Game } from "../abstractClasses/game";
import { toJS } from "mobx";

export class BotR extends Bot{
    constructor(){
        super()
    }

    def(player: Player, game: Game){
        console.log(player, game)
        for(let i = 0;i !== game.batleCards.length;i++){
            if(game.batleCards[i] === null || game.batleCards[i]?.length === 2) continue
            console.log(game.batleCards[i])
            for(let j = player.carts.length - 1;j > -1;j--){
                console.log(j)
                console.log(player.carts[j])
                if(player.carts[j].canBeat((game.batleCards[i] as any)[0], game.trump) === 0){
                    console.log(player.carts[j])
                    setTimeout(() => game.addDefCart(i, player.carts[j]), 3000)
                    // player.removeCart(player.carts[i])
                    break;
                }
            }
            break;
        }
    }
    move(player: Player, game: Game){
        console.log(player, game)
    }
    retr(player: Player, game: Game){
        console.log(player, game)
    }
}