import { Bot } from "../abstractClasses/bot";
import { Player } from "../abstractClasses/player";
import { Game } from "../abstractClasses/game";

export class BotR extends Bot{
    constructor(){
        super()
    }

    def(player: Player, game: Game){
        console.log(player, game)
    }
    move(player: Player, game: Game){
        console.log(player, game)
    }
    retr(player: Player, game: Game){
        console.log(player, game)
    }
}