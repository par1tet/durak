import cl from './DeckOfCarts.module.css'
import { Cart } from '../utils/abstractClasses/cart'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'

type propsDeck = {
    carts: Cart[],
    onDragEnd: (e: React.DragEvent<HTMLImageElement>, cart: Cart) => undefined,
    onClick: (e: React.MouseEvent<HTMLImageElement, MouseEvent>, element: Cart) => undefined,
}

export const DeckOfCarts = observer(({carts, onDragEnd, onClick}: propsDeck) => {
    const imgRef = useRef(null)

    // carts.map(cart =>{
    //     console.log(cart.level)
    //     console.log(cart.suit)
    // })
    
    return (
        <div className={cl.deck}>
            {carts.map((cart: Cart) =>
                <img
                    src={new URL(`/src/assets/images/carts/${cart.level}${cart.suit}.png`, import.meta.url).toString()}
                    key={`${cart.level}${cart.suit}`}
                    className={cl['deck-img']}
                    onDragEnd={e => onDragEnd(e, cart)}
                    ref={imgRef}
                    onClick={e => {
                        if(imgRef.current)onClick(e, cart)
                    }}
                    draggable
                />
            )}
        </div>
    )
})