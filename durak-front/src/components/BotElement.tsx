import { Player } from '../utils/abstractClasses/player'
import { Game } from '../utils/abstractClasses/game'
import { stateOfPlayer } from '../utils/enums/stateOfPlayer'
import cl from './BotElement.module.css'
import moveIndicator from './../assets/images/moveIndicator.png'

type propsBot = {
    player: Player,
    store: Game,
    isMove: stateOfPlayer
}

export const BotElement = ({player, store, isMove}: propsBot) => {

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
    }else if(store.winners.length === (store.players.length - 1)){
        return (<div className={cl['player']}>
        <div className={cl['player-nickname']}>
            <span>
                {player.nickName}
            </span>
            <span>
                Дурак
            </span>
        </div>
        </div>)
    }else{
        return (<div className={cl['player']} >
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