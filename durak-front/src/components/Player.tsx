import { Player } from "../utils/abstractClasses/player"
import { DeckOfCarts } from "./DeckOfCarts"
import cl from './Player.module.css'
import moveIndicator from './../assets/images/moveIndicator.png'
import { observer } from "mobx-react-lite"
import { useStore } from "../hooks/useStore"
import { rootStore } from "../store/rootStore"
import { toJS } from "mobx"
import { Cart } from "../utils/abstractClasses/cart"

type propsPlayer = {
    player: Player,
    isMove: boolean
}

export const PlayerElement = observer(({player, isMove}: propsPlayer) => {
    const myRootStore: rootStore = useStore()

    function handleDragEnd(e: React.DragEvent<HTMLImageElement>, cart: Cart): number | void{
        const elementFromPoint = document.elementFromPoint(e.clientX, e.clientY)

        if (elementFromPoint === null) { return 0 }

        // СУКА, Я СДЕЛАЛ ЕГО ANY, ТАК КАК ВЫДАЕТЬСЯ ЕБАНАЯ БЛЯТЬ ОШИБКА
        // Я СДЕЛАЛ МИЛЛИОН ПРОВЕРОК, А ЕМУ ПОХУЙ, КАРОЧЕ ПОШЕЛ ЭТОТ ТАЙПСКРИПТ НАХУЙ!!!!11

        const indexOfCartBuild: number = +((elementFromPoint.attributes as any).getNamedItem('data-index').value)

        myRootStore.gameWithYourself.batleCards[indexOfCartBuild] = cart
        console.log(toJS(myRootStore.gameWithYourself.players[0].carts))
        player.removeCart(cart)
    }

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
        <DeckOfCarts carts={player.carts} onDragEnd={handleDragEnd}></DeckOfCarts>
    </div>)
})