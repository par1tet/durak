import { Player } from "../utils/abstractClasses/player"
import { DeckOfCarts } from "./DeckOfCarts"
import cl from './Player.module.css'
import moveIndicator from './../assets/images/moveIndicator.png'
import { observer } from "mobx-react-lite"
import { useStore } from "../hooks/useStore"
import { rootStore } from "../store/rootStore"
import { Cart } from "../utils/abstractClasses/cart"
import { stateOfPlayer } from "../utils/enums/stateOfPlayer"
import { forwardRef } from "react"
import { toJS } from "mobx"

type propsPlayer = {
    player: Player,
    isMove: stateOfPlayer,
    rerenderKey: any,
    setRerenderKey: any
}
export const PlayerElement = observer(forwardRef(({player, isMove, rerenderKey, setRerenderKey}: propsPlayer, ref:React.ForwardedRef<HTMLDivElement>) => {
    const myRootStore: rootStore = useStore()

    function handleDragEnd(e: React.DragEvent<HTMLImageElement>, cart: Cart): undefined{
        if(myRootStore.gameWithYourself.winners.length === (myRootStore.gameWithYourself.players.length - 1)){
            return undefined
        }
        const elementFromPoint = document.elementFromPoint(e.clientX, e.clientY)
        if (elementFromPoint === null) { return undefined }
        if ((elementFromPoint.attributes as any)['data-index'] === undefined) return undefined
        const indexOfCartBuild: number = +((elementFromPoint.attributes as any)['data-index'].value)

        switch (isMove){
            case stateOfPlayer['move']:{
                // если главный игрок
                if(myRootStore.gameWithYourself.changeBatleCards(indexOfCartBuild, cart) === 0){
                    player.removeCart(cart)
                }
                break;
            }
            case stateOfPlayer['def']:{
                // если защищающийся игрок
                if(myRootStore.gameWithYourself.changeDefCards(indexOfCartBuild, cart) === 0){
                    player.removeCart(cart)
                }
                break;
            }
            case stateOfPlayer['retr']:{
                // если подкидывающий игрок
                if(!(myRootStore.gameWithYourself.isCleanBatleCards())){
                    if(myRootStore.gameWithYourself.changeBatleCards(indexOfCartBuild, cart) === 0){
                        player.removeCart(cart)
                    }
                }else{
                    return
                }
                break;
            }
        }
        myRootStore.gameWithYourself.checkWinners()
        player.sortCarts(myRootStore.gameWithYourself.trump)
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
    }else if(myRootStore.gameWithYourself.winners.length === (myRootStore.gameWithYourself.players.length - 1)){
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