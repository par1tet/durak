import { Player } from "./player";
import { Game } from "./game";

export abstract class Bot {
    def(player: Player, game: Game, getCarts: () => void){}
    move(player: Player, game: Game, beaten:() => void){}
    retr(player: Player, game: Game){}
}