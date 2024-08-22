import cl from './DeckOfCarts.module.css'
import { Cart } from '../utils/abstractClasses/cart'

type propsDeck = {
    carts: Cart[]
}

export const DeckOfCarts = ({carts}: propsDeck) => {
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
                />
            )}
        </div>
    </>)
}