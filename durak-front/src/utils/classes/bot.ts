import { Bot } from "../abstractClasses/bot";
import { Player } from "../abstractClasses/player";
import { Game } from "../abstractClasses/game";
import { toJS } from "mobx";

export class BotR extends Bot{
    constructor(){
        super()
    }

    def(player: Player, game: Game, getCarts: () => void){
        for(let i = 0;i !== game.batleCards.length;i++){
            if(game.batleCards[i] == null || game.batleCards[i]?.length === 2) continue
            for(let j = player.carts.length - 1;j > -1;j--){
                if(player.carts[j].canBeat((game.batleCards[i] as any)[0], game.trump) === 0){
                    game.addDefCart(i, player.carts[j])
                    player.removeCart(player.carts[j])
                    break;
                }
                if (j === 0){
                    getCarts()
                }
            }
            break;
        }
    }
    move(player: Player, game: Game, beaten:() => void){
        if (!this.canMove) return;
        if(game.isCleanBatleCards()){
            if(game.changeBatleCards(0, player.carts[player.carts.length-1]) === 0){
                player.removeCart(player.carts[player.carts.length - 1])
            }
        }else{
            if(game.isBeaten()){
                beaten()
            }
        }
    }
    retr(player: Player, game: Game){}
}