import { Player } from "./player";
import { Game } from "./game";

export abstract class Bot {
    def(player: Player, game: Game){}
    move(player: Player, game: Game){}
    retr(player: Player, game: Game){}
}