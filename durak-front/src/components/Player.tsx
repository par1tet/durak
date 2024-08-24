import { Player } from "../utils/abstractClasses/player"
import { DeckOfCarts } from "./DeckOfCarts"
import cl from './Player.module.css'
import moveIndicator from './../assets/images/moveIndicator.png'
import { observer } from "mobx-react-lite"
import { useStore } from "../hooks/useStore"
import { rootStore } from "../store/rootStore"
import { Cart } from "../utils/abstractClasses/cart"
import { useState } from "react"
import { stateOfPlayer } from "../utils/enums/stateOfPlayer"

type propsPlayer = {
    player: Player,
    isMove: stateOfPlayer
}

export const PlayerElement = observer(({player, isMove}: propsPlayer) => {
    const myRootStore: rootStore = useStore()
    const [rerender, setRerender] = useState(1)

    function handleDragEnd(e: React.DragEvent<HTMLImageElement>, cart: Cart): undefined{
        const elementFromPoint = document.elementFromPoint(e.clientX, e.clientY)
        if (elementFromPoint === null) { return undefined }
        const indexOfCartBuild: number = +((elementFromPoint.attributes as any)['data-index'].value)
        console.log(indexOfCartBuild)

        if(myRootStore.gameWithYourself.players[myRootStore.gameWithYourself.whoMove] === player){
            myRootStore.gameWithYourself.changeBatleCards(indexOfCartBuild, cart)
            player.removeCart(cart)

        }else if(myRootStore.gameWithYourself.whoMove + 1 < myRootStore.gameWithYourself.players.length){
            if(myRootStore.gameWithYourself.players[myRootStore.gameWithYourself.whoMove+1] === player){
                if(myRootStore.gameWithYourself.changeDefCards(indexOfCartBuild, cart) === 0){
                    player.removeCart(cart)
                }
            }else{
                return
            }
        }else if(myRootStore.gameWithYourself.whoMove + 1 === myRootStore.gameWithYourself.players.length){
            if(myRootStore.gameWithYourself.players[0] === player){
                if(myRootStore.gameWithYourself.changeDefCards(indexOfCartBuild, cart) === 0){
                    player.removeCart(cart)
                }
            }else{
                return
            }
        }else{
            return
        }



        // myRootStore.gameWithYourself.setWhoMove(prev => prev+1)
        setRerender(prev => prev + 1)// специально рендерим компонент, так как mobx ебучий это не делает
    }

    return (<div className={cl['player']} key={rerender}>
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
})