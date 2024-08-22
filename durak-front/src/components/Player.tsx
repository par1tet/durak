import { Player } from "../utils/abstractClasses/player"
import { DeckOfCarts } from "./DeckOfCarts"
import cl from './Player.module.css'

type propsPlayer = {
    player: Player
}

export const PlayerElement = ({player}: propsPlayer) => {
    return (<div className={cl['player']}>
        <span className={cl['player-nickname']}>{player.nickName}</span>
        <DeckOfCarts carts={player.carts}></DeckOfCarts>
    </div>)
}