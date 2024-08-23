import cl from './DeckOfCarts.module.css'
import { Cart } from '../utils/abstractClasses/cart'

type propsDeck = {
    carts: Cart[],
    onDragEnd: (e: React.DragEvent<HTMLImageElement>, cart: Cart) => number | void
}

export const DeckOfCarts = ({carts, onDragEnd}: propsDeck) => {
    // carts.map(cart =>{
    //     console.log(cart.level)
    //     console.log(cart.suit)
    // })

    return (<>
        <div className={cl.deck}>
            {carts.map(cart =>
                <img
                    src={`/src/assets/images/carts/${cart.level}${cart.suit}.png`}
                    alt="100"
                    key={`${cart.level}:${cart.suit}`}
                    className={cl['deck-img']}
                    onDragEnd={e => onDragEnd(e, cart)}
                    draggable
                />
            )}
        </div>
    </>)
}