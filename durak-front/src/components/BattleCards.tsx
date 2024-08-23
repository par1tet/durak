import cl from './BattleCards.module.css'
import { useStore } from '../hooks/useStore'
import { rootStore } from '../store/rootStore'
import { Cart } from '../utils/abstractClasses/cart'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

export const BattleCards = observer(({}) => {
    const myRootStore: rootStore = useStore()

    console.log(324)

    return (<div className={cl['battlecards']}>
        {toJS(myRootStore.gameWithYourself.batleCards).map((cart: Cart | null, index:number) => {
            if (!cart){
                return (<div
                    className={cl['battlecards-card']}
                    key={index}
                    data-type='battlecard'
                    data-index={index}
                    draggable
                >
                </div>)
            } else {
                return (<img
                    src={`/src/assets/images/carts/${cart.level}${cart.suit}.png`}
                    alt="100"
                    key={index}
                    className={cl['battlecards-cardshow']}
                    draggable
                />)
            }
        })
        }
    </div>)
})