import cl from './DeckOfCarts.module.css'
import { Cart } from '../utils/abstractClasses/cart'
import { observer } from 'mobx-react-lite'

type propsDeck = {
    carts: Cart[],
    onDragEnd: (e: React.DragEvent<HTMLImageElement>, cart: Cart) => undefined
}

export const DeckOfCarts = observer(({carts, onDragEnd}: propsDeck) => {
    // carts.map(cart =>{
    //     console.log(cart.level)
    //     console.log(cart.suit)
    // })

    console.log(324)

    return (
        <div className={cl.deck}>
            {carts.map((cart: Cart) =>
                <img
                    src={`/src/assets/images/carts/${cart.level}${cart.suit}.png`}
                    key={`${cart.level}${cart.suit}`}
                    className={cl['deck-img']}
                    onDragEnd={e => onDragEnd(e, cart)}
                    draggable
                />
            )}
        </div>
    )
})