import { Player } from "../utils/abstractClasses/player"
import { DeckOfCarts } from "./DeckOfCarts"
import cl from './Player.module.css'
import moveIndicator from './../assets/images/moveIndicator.png'
import { observer } from "mobx-react-lite"
import { useStore } from "../hooks/useStore"
import { rootStore } from "../store/rootStore"
import { Game } from "../utils/abstractClasses/game"
import { Cart } from "../utils/abstractClasses/cart"
import { stateOfPlayer } from "../utils/enums/stateOfPlayer"
import { forwardRef } from "react"
import { toJS } from "mobx"

type propsPlayer = {
    player: Player,
    isMove: stateOfPlayer,
    store: Game,
    rerenderKey: any,
    setRerenderKey: any
}
export const PlayerElement = observer(forwardRef(({
    player,
    isMove,
    rerenderKey,
    setRerenderKey,
    store
}: propsPlayer, ref:React.ForwardedRef<HTMLDivElement>) => {

    function handleDragEnd(e: React.DragEvent<HTMLImageElement>, cart: Cart): undefined{
        if(store.winners.length === (store.players.length - 1)){
            return undefined
        }
        const elementFromPoint = document.elementFromPoint(e.clientX, e.clientY)
        if (elementFromPoint === null) { return undefined }
        if ((elementFromPoint.attributes as any)['data-index'] === undefined) return undefined
        const indexOfCartBuild: number = +((elementFromPoint.attributes as any)['data-index'].value)

        switch (isMove){
            case stateOfPlayer['move']:{
                // если главный игрок
                if(store.changeBatleCards(indexOfCartBuild, cart) === 0){
                    player.removeCart(cart)
                }
                break;
            }
            case stateOfPlayer['def']:{
                // если защищающийся игрок
                switch(store.changeDefCards(indexOfCartBuild, cart)){
                    case 0:
                        player.removeCart(cart)
                    break;
                    case 1:
                        player.removeCart(cart)
                        store.setWhoMove(prev => prev + 1)
                    break;
                }
                break;
            }
            case stateOfPlayer['retr']:{
                // если подкидывающий игрок
                if(!(store.isCleanBatleCards())){
                    if(store.changeBatleCards(indexOfCartBuild, cart) === 0){
                        player.removeCart(cart)
                    }
                }else{
                    return
                }
                break;
            }
        }
        store.checkWinners()
        player.sortCarts(store.trump)
        setRerenderKey((prev: number) => prev + 1)// специально рендерим компонент, так как mobx ебучий это не делает
    }

    if(player.isWin){
        return (<div className={cl['player']} key={rerenderKey} ref={ref}>
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
        return (<div className={cl['player']} key={rerenderKey} ref={ref}>
        <div className={cl['player-nickname']}>
            <span>
                {player.nickName}
            </span>
            <span>
                Дурак
            </span>
        </div>
        <DeckOfCarts carts={player.carts} onDragEnd={handleDragEnd}></DeckOfCarts>
        </div>)
    }else{
        return (<div className={cl['player']} key={rerenderKey} ref={ref}>
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
        <DeckOfCarts carts={player.carts} onDragEnd={handleDragEnd}></DeckOfCarts>
    </div>)
    }
}))