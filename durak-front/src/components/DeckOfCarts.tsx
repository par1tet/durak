import cl from './DeckOfCarts.module.css'
import { Cart } from '../utils/abstractClasses/cart'
import { useStore } from '../hooks/useStore'
import { rootStore } from '../store/rootStore'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

type propsDeck = {
    carts: Cart[]
}

export const DeckOfCarts = observer(({carts}: propsDeck) => {
    const myRootStore: rootStore = useStore()

    // carts.map(cart =>{
    //     console.log(cart.level)
    //     console.log(cart.suit)
    // })

    function handleDragEnd(e: React.DragEvent<HTMLImageElement>, cart: Cart){
        const elementFromPoint = document.elementFromPoint(e.clientX, e.clientY)

        if (elementFromPoint === null) { return 0 }

        // СУКА, Я СДЕЛАЛ ЕГО ANY, ТАК КАК ВЫДАЕТЬСЯ ЕБАНАЯ БЛЯТЬ ОШИБКА
        // Я СДЕЛАЛ МИЛЛИОН ПРОВЕРОК, А ЕМУ ПОХУЙ, КАРОЧЕ ПОШЕЛ ЭТОТ ТАЙПСКРИПТ НАХУЙ!!!!11

        const indexOfCartBuild: number = +((elementFromPoint.attributes as any).getNamedItem('data-index').value)

        console.log(myRootStore.gameWithYourself.batleCards[indexOfCartBuild])
        myRootStore.gameWithYourself.batleCards[indexOfCartBuild] = cart
        console.log(toJS(myRootStore.gameWithYourself.batleCards))
    }

    return (<>
        <div className={cl.deck}>
            {carts.map(cart =>
                <img
                    src={`/src/assets/images/carts/${cart.level}${cart.suit}.png`}
                    alt="100"
                    key={`${cart.level}:${cart.suit}`}
                    className={cl['deck-img']}
                    onDragEnd={e => handleDragEnd(e, cart)}
                    draggable
                />
            )}
        </div>
    </>)
})