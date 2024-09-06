import { Player } from '../utils/abstractClasses/player'
import { Game } from '../utils/abstractClasses/game'
import { stateOfPlayer } from '../utils/enums/stateOfPlayer'
import cl from './BotElement.module.css'
import moveIndicator from './../assets/images/moveIndicator.png'
import { BotR } from '../utils/classes/bot'
import { useState, useEffect } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { botController } from '../utils/specific/botController'

type propsBot = {
    player: Player,
    store: Game,
    isMove: stateOfPlayer,
}

export const BotElement = observer(({player, store, isMove}: propsBot) => {
    if(player.carts.length !== 0){
        switch (isMove){
            case stateOfPlayer['def']:
                botController.def(player, store, () => {
                    // если защищающийся игрок
                    // передаем карты со стола, игроку
                    for(let i = 0;i !== store.batleCards.length;i++) {
                        if (store.batleCards[i]) {
                            if((store.batleCards[i] as any).length === 1){
                                player.carts.push((store.batleCards[i] as any)[0])
                            }else{
                                player.carts.push((store.batleCards[i] as any)[0])
                                player.carts.push((store.batleCards[i] as any)[1])
                            }
                        }
                    }
    
                    // очищаем стол
                    store.clearBatleCarts()
    
                    // передаем карты атакаущиему игроку
                    store.replenishCards(toJS(store.whoMove))
                    store.players[toJS(store.whoMove)].sortCarts(store.trump)
    
                    // передаем карты остальным игрокам
                    for (let i: number = 0;i !== toJS(store.players.length);i++){
                        if(toJS(store.whoMove) === i){
                        }else if(toJS(store.whoMove) + 1 === i){
                        }else{
                            store.replenishCards(i)
                            store.players[i].sortCarts(store.trump)
                        }
                    }
    
                    // передаем очередь
                    for(let i = 2;;i++){
                        if (store.players[store.getNextWhoMove(prev => prev + i)].isWin){
                        }else{
                            store.setWhoMove(prev => prev + i)
                            break
                        }
                    }
                })
                break;
            case stateOfPlayer['move']:
                botController.move(player, store, () => {
                    botController.canMove = false;
                    setTimeout(() => {
                        botController.canMove = true;
                    }, 0)
                    // очищаем стол
                    store.clearBatleCarts()

                    // передаем карты атакаущиему игроку
                    store.replenishCards(toJS(store.whoMove))

                    // передаем карты остальным игрокам
                    for (let i: number = 0;i !== toJS(store.players.length);i++){
                        store.replenishCards(i)
                    }

                    // передаем очередь
                    for(let i = 1;;i++){
                        if (store.players[store.getNextWhoMove(prev => prev + i)].isWin){
                        }else{
                            store.setWhoMove(prev => prev + i)
                            break
                        }
                    }
                })
                break;
            case stateOfPlayer['retr']:
                botController.retr(player, store)
                break;
        }
    }

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
})