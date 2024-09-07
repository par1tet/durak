import cl from './BattleCards.module.css'
import { Cart } from '../utils/abstractClasses/cart'
import { observer } from 'mobx-react-lite'
import { Game } from '../utils/abstractClasses/game'
import { stateOfPlayer } from '../utils/enums/stateOfPlayer'
import { rootStore } from '../store/rootStore'

type propsBattleCards = {
    batleCards: (Cart[] | null)[],
    store: Game,
    myRootStore: rootStore,
    setRerenderKey: any,
    onClickDecorator?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => undefined,
}

export const BattleCards = observer(({batleCards, store, myRootStore, setRerenderKey, onClickDecorator}: propsBattleCards) => {
    const onClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if(myRootStore.playerCart.currentCart == undefined || myRootStore.playerCart.currentCart == undefined) return undefined
    
        const elementFromPoint = document.elementFromPoint(e.clientX, e.clientY)
    
        if (elementFromPoint === null) { return undefined }
        if ((elementFromPoint.attributes as any)['data-index'] === undefined) return undefined
        const indexOfCartBuild: number = +((elementFromPoint.attributes as any)['data-index'].value)
        const index = store.players.findIndex(pl => pl === (myRootStore.playerCart.currentPlayer as any))
    
        const isMove = (()=>{
            if (store.whoMove === index){
                return stateOfPlayer['move']
            }else if(store.getDefPlayerIndex() === index){
                return stateOfPlayer['def']
            }else {
                return stateOfPlayer['retr']
            }
        })()
    
        switch (isMove){
            case stateOfPlayer['move']:{
                // если главный игрок
                if(store.changeBatleCards(indexOfCartBuild, (myRootStore.playerCart.currentCart as any)) === 0){
                    (myRootStore.playerCart.currentPlayer as any).removeCart((myRootStore.playerCart.currentCart as any))
                }
                break;
            }
            case stateOfPlayer['def']:{
                // если защищающийся игрок
                switch(store.changeDefCards(indexOfCartBuild, (myRootStore.playerCart.currentCart as any))){
                    case 0:
                        (myRootStore.playerCart.currentPlayer as any).removeCart((myRootStore.playerCart.currentCart as any))
                        break;
                    case 1:
                        (myRootStore.playerCart.currentPlayer as any).removeCart((myRootStore.playerCart.currentCart as any))
                        // передаем очередь
                        for(let i = 1;;i++){
                            if (store.players[store.getNextWhoMove(prev => prev + i)].isWin){
                            }else{
                                store.setWhoMove(prev => prev + i)
                                break
                            }
                        }
                        break
                    default:
                    break;
                }
                break;
            }
            case stateOfPlayer['retr']:{
                // если подкидывающий игрок
                if(!(store.isCleanBatleCards())){
                    if(store.changeBatleCards(indexOfCartBuild, (myRootStore.playerCart.currentCart as any)) === 0){
                        (myRootStore.playerCart.currentPlayer as any).removeCart((myRootStore.playerCart.currentCart as any))
                    }
                }else{
                    return
                }
                break;
            }
        }
        store.checkWinners();
        (myRootStore.playerCart.currentPlayer as any).sortCarts(store.trump);
        myRootStore.playerCart.changeCurrent(null, null)
        setRerenderKey((prev: number) => prev + 1)
    }

    const onClickCall = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        await onClick(e)
        if(onClickDecorator){
            await onClickDecorator(e)
        }
    }

    return (<div className={cl['battlecards']}>
        {batleCards.map((carts: Cart[] | null, index:number) => {
            if (!carts){
                return (<div
                    className={cl['battlecards-card']}
                    key={index}
                    data-type='battlecard'
                    data-index={index}
                    draggable
                    onClick={onClickCall}
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
                        onClick={onClickCall}
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