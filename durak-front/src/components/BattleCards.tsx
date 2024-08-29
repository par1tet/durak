import cl from './BattleCards.module.css'
import { Cart } from '../utils/abstractClasses/cart'
import { observer } from 'mobx-react-lite'

type propsBattleCards = {
    batleCards: (Cart[] | null)[]
}

export const BattleCards = observer(({batleCards}: propsBattleCards) => {
    return (<div className={cl['battlecards']}>
        {batleCards.map((carts: Cart[] | null, index:number) => {
            if (!carts){
                return (<div
                    className={cl['battlecards-card']}
                    key={index}
                    data-type='battlecard'
                    data-index={index}
                    draggable
                >
                </div>)
            } else {
                if(carts.length === 1){
                    return (<div key={index} className={cl['battlecard-cards']}>
                        <img
                        src={`/src/assets/images/carts/${carts[0].level}${carts[0].suit}.png`}
                        data-type='battlecard'
                        data-index={index}
                        className={cl['battlecards-cardattack']}
                        draggable
                        />
                    </div>)
                }else{
                    return (<div key={index} className={cl['battlecard-cards']}>
                        <img
                            src={`/src/assets/images/carts/${carts[0].level}${carts[0].suit}.png`}
                            className={cl['battlecards-cardattack']}
                            draggable
                        />
                        <img
                            src={`/src/assets/images/carts/${carts[1].level}${carts[1].suit}.png`}
                            className={cl['battlecards-carddef']}
                            draggable
                        />
                    </div>)
                }

            }
        })
        }
    </div>)
})