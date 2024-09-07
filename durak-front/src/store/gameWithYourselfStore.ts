import { makeObservable, observable, action } from "mobx";
import { GameR } from "../utils/classes/game.ts";

export class gameWithYourselfStore extends GameR{
    constructor(){
        super()
        makeObservable(this, {
            carts: observable,
            players: observable,
            trump: observable,
            whoMove: observable,
            typeGame: observable,
            trumpCart: observable,
            batleCards: observable,
            changeBatleCards: action,
            changeDefCards: action,
            setWhoMove: action,
            getNextWhoMove: action,
            clearBatleCarts: action,
            isCleanBatleCards: action,
            replenishCards: action,
            isBeaten: action,
            checkWinners: action,
            isWinner: action,
            getDefPlayerIndex: action,
            addDefCart: action
        })
    }
}