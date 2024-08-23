import { Player } from "../utils/abstractClasses/player"
import { DeckOfCarts } from "./DeckOfCarts"
import cl from './Player.module.css'
import moveIndicator from './../assets/images/moveIndicator.png'

type propsPlayer = {
    player: Player,
    isMove: boolean
}

export const PlayerElement = ({player, isMove}: propsPlayer) => {
    return (<div className={cl['player']}>
        <div className={cl['player-nickname']}>
            <span>
                {player.nickName}
            </span>
            {(() => {
                if (isMove){
                    return (
                        <img
                            className={cl['moveindicator']}
                            src={moveIndicator}
                            alt="move" />
                    )
                }
            })()}
        </div>
        <DeckOfCarts carts={player.carts}></DeckOfCarts>
    </div>)
}