import cl from './TrumpElement.module.css'
import { toJS } from 'mobx'
import { useStore } from '../hooks/useStore'
import { rootStore } from '../store/rootStore'
import { observer } from 'mobx-react-lite'
import { Cart } from '../utils/abstractClasses/cart'

export const TrumpElement = observer(({}) => {
    const myRootStore: rootStore = useStore()
    const trumpCart: Cart | null = myRootStore.gameWithYourself.trumpCart

    if (trumpCart){
        if (myRootStore.gameWithYourself.carts.length === 0){
            return (<div className={cl['trump']}>
                <div className={`${cl['trump-cards']} ${cl['trump-cards_opacity0']}`}>
                    <img src={`/src/assets/images/carts/shirt.png`} alt="" />
                    <span>{toJS(myRootStore.gameWithYourself.carts.length)}</span>
                </div>
                <img
                    className={cl['trump-trumpcard']}
                    src={`/src/assets/images/carts/${trumpCart.level}${trumpCart.suit}.png`}
                    alt=""
                />
            </div>)
        }else{
            return (<div className={cl['trump']}>
                <div className={cl['trump-cards']}>
                    <img src={`/src/assets/images/carts/shirt.png`} alt="" />
                    <span>{toJS(myRootStore.gameWithYourself.carts.length)}</span>
                </div>
                <img
                    className={cl['trump-trumpcard']}
                    src={`/src/assets/images/carts/${trumpCart.level}${trumpCart.suit}.png`}
                    alt=""
                />
            </div>)
        }
    } else {
        return (<div className={cl['trumpicon']}>
            {(()=>{
                switch(toJS(myRootStore.gameWithYourself.trump)){
                    case 0:
                        return (<img src='/src/assets/images/diamonds.webp' />)
                    case 1:
                        return (<img src='/src/assets/images/hearts.webp' />)
                    case 2:
                        return (<img src='/src/assets/images/spades.webp' />)
                    case 3:
                        return (<img src='/src/assets/images/clubs.webp' />)
                }
            })()}
        </div>)
    }
})