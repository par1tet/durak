import { gameWithYourselfStore } from "./gameWithYourselfStore";

export class rootStore{
    gameWithYourself: gameWithYourselfStore
    constructor(){
        this.gameWithYourself = new gameWithYourselfStore()
    }
}