import cl from './TrumpElement.module.css'
import { observer } from 'mobx-react-lite'
import { Cart } from '../utils/abstractClasses/cart'
import { Suit } from '../utils/enums/suit'

type propsTrumpElement = {
    carts: Cart[],
    trumpCart: Cart | null,
    trump: Suit
}

export const TrumpElement = observer(({carts, trumpCart, trump}: propsTrumpElement) => {
    if (trumpCart){
        if (carts.length === 0){
            return (<div className={cl['trump']}>
                <div className={`${cl['trump-cards']} ${cl['trump-cards_opacity0']}`}>
                    <img src={new URL(`/src/assets/images/carts/shirt.png`, import.meta.url).toString()} alt="" />
                    <span>{carts.length}</span>
                </div>
                <img
                    className={cl['trump-trumpcard']}
                    src={new URL(`/src/assets/images/carts/${trumpCart.level}${trumpCart.suit}.png`, import.meta.url).toString()}
                    alt={`${trumpCart.level}${trumpCart.suit}`}
                />
            </div>)
        }else{
            return (<div className={cl['trump']}>
                <div className={cl['trump-cards']}>
                    <img src={new URL(`/src/assets/images/carts/shirt.png`, import.meta.url).toString()} alt="shirt" />
                    <span>{carts.length}</span>
                </div>
                <img
                    className={cl['trump-trumpcard']}
                    src={new URL(`/src/assets/images/carts/${trumpCart.level}${trumpCart.suit}.png`, import.meta.url).toString()}
                    alt=""
                />
            </div>)
        }
    } else {
        return (<div className={cl['trumpicon']}>
            {(()=>{
                switch(trump){
                    case 0:
                        return (<img src={new URL(`/src/assets/images/diamonds.webp`, import.meta.url).toString()} />)
                    case 1:
                        return (<img src={new URL(`/src/assets/images/hearts.webp`, import.meta.url).toString()}  />)
                    case 2:
                        return (<img src={new URL(`/src/assets/images/spades.webp`, import.meta.url).toString()}  />)
                    case 3:
                        return (<img src={new URL(`/src/assets/images/clubs.webp`, import.meta.url).toString()}  />)
                }
            })()}
        </div>)
    }
})