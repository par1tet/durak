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
        const elementFromPoint = document.elementFromPoint(e.clientX, e.clientY)
        if (elementFromPoint === null) { return undefined }
        if ((elementFromPoint.attributes as any)['data-index'] === undefined) return undefined
        const indexOfCartBuild: number = +((elementFromPoint.attributes as any)['data-index'].value)

        if(toJS(myRootStore.gameWithYourself.players[myRootStore.gameWithYourself.whoMove]) === player){
            // если главный игрок
            console.log('a')
            if(myRootStore.gameWithYourself.changeBatleCards(indexOfCartBuild, cart) === 0){
                player.removeCart(cart)
            }
        }else if(
                toJS(myRootStore.gameWithYourself.players[toJS(myRootStore.gameWithYourself.whoMove) + 1]) === player ||
                toJS(myRootStore.gameWithYourself.whoMove) + 1 === toJS(myRootStore.gameWithYourself.players.length)){
            // если защищающийся игрок
            console.log('def')
            if(myRootStore.gameWithYourself.changeDefCards(indexOfCartBuild, cart) === 0){
                player.removeCart(cart)
            }
        }else{
            // если подкидывающий игрок
            console.log('f')

            if(!(myRootStore.gameWithYourself.isCleanBatleCards())){
                if(myRootStore.gameWithYourself.changeBatleCards(indexOfCartBuild, cart) === 0){
                    player.removeCart(cart)
                }
            }else{
                return
            }
        }

        // myRootStore.gameWithYourself.setWhoMove(prev => prev+1)
        setRerenderKey((prev: number) => prev + 1)// специально рендерим компонент, так как mobx ебучий это не делает
    }

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
}))