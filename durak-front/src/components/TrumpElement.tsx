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
    } else {
        
    }
})