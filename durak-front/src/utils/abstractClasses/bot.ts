import { Player } from "./player";
import { Game } from "./game";

export abstract class Bot {
    canMove: boolean = true
    def(player: Player, game: Game, getCarts: () => void){player;game;getCarts}
    move(player: Player, game: Game, beaten:() => void){player;game;beaten}
    retr(player: Player, game: Game){player;game}
}