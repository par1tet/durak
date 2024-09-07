import { Player } from "../utils/abstractClasses/player"
import cl from './OnlineAnotherPlayer.module.css'
import { stateOfPlayer } from "../utils/enums/stateOfPlayer"
import moveIndicator from './../assets/images/moveIndicator.png'

type onlineAnotherPlayerProps = {
    player: Player,
    isMove: stateOfPlayer
}

export const OnlineAnotherPlayer = ({player, isMove}: onlineAnotherPlayerProps) => {
    if(player.isWin){
        return (<div className={cl['player']}>
        <div className={cl['player-nickname']}>
            <span>
                {player.nickName}
            </span>
            <span>
                Выиграл
            </span>
        </div>
        </div>)
    }else{
        return (<div className={cl['player']}>
        <div className={cl['player-nickname']}>
            <span>
                {player.nickName}
            </span>
            {(() => {
                switch (isMove){
                    case stateOfPlayer['move']:{
                        return (
                            <img
                                className={cl['moveindicator']}
                                src={moveIndicator}
                                alt="move"
                            />
                        )
                    }
                    case stateOfPlayer['def']:{
                        return (
                            <img
                                className={cl['defindicator']}
                                src={moveIndicator}
                                alt="move"
                            />
                        )
                    }
                    case stateOfPlayer['retr']:{
                        return (
                            <img
                                className={cl['retrindicator']}
                                src={moveIndicator}
                                alt="move"
                            />
                        )
                    }
                }
            })()}
        </div>
        <div className={cl['carts']}>
            <img src={`/src/assets/images/carts/shirt.png`} alt="shirt"/>
            <span>{player.carts.length}</span>
        </div>
    </div>)
    }
}