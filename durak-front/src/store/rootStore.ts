import { gameWithYourselfStore } from "./gameWithYourselfStore.ts";
import { gameWithBotsStore } from "./gameWithBotsStore.ts";
import { onlineGameStore } from "./onlineGameStore.ts";
import { playerCartStore } from "./playerCartStore.ts";

export class rootStore {
    gameWithYourself: gameWithYourselfStore
    gameWithBots: gameWithBotsStore
    onlineGame: onlineGameStore
    playerCart: playerCartStore

    constructor(){
        this.gameWithYourself = new gameWithYourselfStore()
        this.gameWithBots = new gameWithBotsStore()
        this.onlineGame = new onlineGameStore()
        this.playerCart = new playerCartStore()
    }
}