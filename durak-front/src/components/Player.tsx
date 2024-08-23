import { Player } from "../utils/abstractClasses/player"
import { DeckOfCarts } from "./DeckOfCarts"
import cl from './Player.module.css'
import moveIndicator from './../assets/images/moveIndicator.png'
import { observer } from "mobx-react-lite"
import { useStore } from "../hooks/useStore"
import { rootStore } from "../store/rootStore"
import { toJS } from "mobx"
import { Cart } from "../utils/abstractClasses/cart"
import { useEffect, useState } from "react"

type propsPlayer = {
    player: Player,
    isMove: boolean
}

export const PlayerElement = observer(({player, isMove}: propsPlayer) => {
    const myRootStore: rootStore = useStore()
    const [rerender, setRerender] = useState(1)

    function handleDragEnd(e: React.DragEvent<HTMLImageElement>, cart: Cart): undefined{
        const elementFromPoint = document.elementFromPoint(e.clientX, e.clientY)

        if (elementFromPoint === null) { return undefined }

        const indexOfCartBuild: number = +((elementFromPoint.attributes as any).getNamedItem('data-index').value)

        myRootStore.gameWithYourself.changeBatleCards(indexOfCartBuild, cart)
        player.removeCart(cart)
        
        setRerender(prev => prev + 1)// специально рендерим компонент, так как mobx ебучий это не делает
    }

    return (<div className={cl['player']} key={rerender}>
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
                            alt="move"
                        />
                    )
                }
            })()}
        </div>
        <DeckOfCarts carts={player.carts} onDragEnd={handleDragEnd}></DeckOfCarts>
    </div>)
})