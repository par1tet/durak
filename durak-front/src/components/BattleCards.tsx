import { ReactNode } from 'react'
import cl from './BattleCards.module.css'

export const BattleCards = ({}) => {
    return (<div className={cl['battlecards']}>
        {(() => {
            const cardsArray: ReactNode[] = []
            for (let i = 0;i !== 6;i++){
                cardsArray.push(<div className={cl['battlecards-card']}>
                    
                </div>)
            }
            return cardsArray
        })()}
    </div>)
}