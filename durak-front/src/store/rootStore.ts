import { gameWithYourselfStore } from "./gameWithYourselfStore";
import { gameWithBotsStore } from "./gameWithBotsStore";

export class rootStore{
    gameWithYourself: gameWithYourselfStore
    gameWithBots: gameWithBotsStore
    constructor(){
        this.gameWithYourself = new gameWithYourselfStore()
        this.gameWithBots = new gameWithBotsStore()
    }
}