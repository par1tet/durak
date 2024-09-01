import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BattleCards } from "../../../components/BattleCards";
import { PlayerElement } from "../../../components/Player";
import { TrumpElement } from "../../../components/TrumpElement";
import { ButtonAction } from "../../../components/UI/button/ButtonAction/ButtonAction";
import { useStore } from "../../../hooks/useStore";
import { rootStore } from "../../../store/rootStore";
import { stateOfPlayer } from "../../../utils/enums/stateOfPlayer";
import { createArrayRefs } from "../../../utils/functions/createArrayRefs";
import cl from './../OnlineGame.module.css';

export const Game = observer(({}) => {
    const myRootStore: rootStore = useStore()
    const actionButtonRefs = createArrayRefs(toJS(myRootStore.onlineGame.players.length))
    const playersRefs = createArrayRefs(toJS(myRootStore.onlineGame.players.length))
    const [playerRerenderKey, setPlayerRerenderKey] = useState(1)

    function handleAction(e: React.MouseEvent<HTMLButtonElement>){
        const playerIndex:number = +(e.target as any).attributes.getNamedItem('data-playerindex').value
        if  (myRootStore.onlineGame.getDefPlayerIndex() === playerIndex)
        {
            // если защищающийся игрок
            // передаем карты со стола, игроку
            for(let i = 0;i !== myRootStore.onlineGame.batleCards.length;i++) {
                if (myRootStore.onlineGame.batleCards[i]) {
                    if((myRootStore.onlineGame.batleCards[i] as any).length === 1){
                        myRootStore.onlineGame.players[playerIndex].carts.push((myRootStore.onlineGame.batleCards[i] as any)[0])
                    }else{
                        myRootStore.onlineGame.players[playerIndex].carts.push((myRootStore.onlineGame.batleCards[i] as any)[0])
                        myRootStore.onlineGame.players[playerIndex].carts.push((myRootStore.onlineGame.batleCards[i] as any)[1])
                    }
                }
            }

            // очищаем стол
            myRootStore.onlineGame.clearBatleCarts()

            // передаем карты атакаущиему игроку
            myRootStore.onlineGame.replenishCards(toJS(myRootStore.onlineGame.whoMove))
            myRootStore.onlineGame.players[toJS(myRootStore.onlineGame.whoMove)].sortCarts(myRootStore.onlineGame.trump)

            // передаем карты остальным игрокам
            for (let i: number = 0;i !== toJS(myRootStore.onlineGame.players.length);i++){
                if(toJS(myRootStore.onlineGame.whoMove) === i){
                }else if(toJS(myRootStore.onlineGame.whoMove) + 1 === i){
                }else{
                    myRootStore.onlineGame.replenishCards(i)
                    myRootStore.onlineGame.players[i].sortCarts(myRootStore.onlineGame.trump)
                }
            }

            // передаем очередь
            for(let i = 2;;i++){
                if (myRootStore.onlineGame.players[myRootStore.onlineGame.getNextWhoMove(prev => prev + i)].isWin){
                }else{
                    myRootStore.onlineGame.setWhoMove(prev => prev + i)
                    break
                }
            }
        } else if(myRootStore.onlineGame.whoMove === playerIndex){
            // если нажал атакующий игрок

            // очищаем стол
            myRootStore.onlineGame.clearBatleCarts()

            // передаем карты атакаущиему игроку
            myRootStore.onlineGame.replenishCards(toJS(myRootStore.onlineGame.whoMove))

            // передаем карты остальным игрокам
            for (let i: number = 0;i !== toJS(myRootStore.onlineGame.players.length);i++){
                myRootStore.onlineGame.replenishCards(i)
            }

            // передаем очередь
            for(let i = 1;;i++){
                if (myRootStore.onlineGame.players[myRootStore.onlineGame.getNextWhoMove(prev => prev + i)].isWin){
                }else{
                    myRootStore.onlineGame.setWhoMove(prev => prev + i)
                    break
                }
            }
        }
        // обновляем игроков
        myRootStore.onlineGame.players[playerIndex].sortCarts(myRootStore.onlineGame.trump)
        setPlayerRerenderKey(prev => prev + 1)
    }

    useEffect(() => {
        if(myRootStore.onlineGame.winners.length === (myRootStore.onlineGame.players.length - 1)){
            return undefined
        }
        for (let i = 0;i !== actionButtonRefs.length;i++){
            if  (myRootStore.onlineGame.getDefPlayerIndex() === i)
            {
                // если защищаюшийся игрок
                let isGetAction:boolean = false;

                for(let i = 0;i !== myRootStore.onlineGame.batleCards.length;i++) {
                    if (myRootStore.onlineGame.batleCards[i]) {
                        if((myRootStore.onlineGame.batleCards[i] as any).length === 1){
                            isGetAction = true
                            break
                        }else{
                            isGetAction = false
                        }
                    }
                }

                if (isGetAction){
                    (actionButtonRefs[i].current as any).classList.remove(cl['buttonaction-notactive']);
                    (actionButtonRefs[i].current as any).innerHTML = 'Взять';
                }else{
                    (actionButtonRefs[i].current as any).classList.add(cl['buttonaction-notactive'])
                }
            }else if (toJS(myRootStore.onlineGame.whoMove) === i){
                // если атакующий игрок
                if (myRootStore.onlineGame.isBeaten()){
                    (actionButtonRefs[i].current as any).classList.remove(cl['buttonaction-notactive']);
                    (actionButtonRefs[i].current as any).innerHTML = 'Бито';
                }else{
                    (actionButtonRefs[i].current as any).classList.add(cl['buttonaction-notactive'])
                }
            }else{
                // если подкидывающий игрок
                (actionButtonRefs[i].current as any).classList.add(cl['buttonaction-notactive'])
            }
        }
    }, [toJS(myRootStore.gameWithBots.batleCards)])

    return (<>
        <TrumpElement
            carts={toJS(myRootStore.onlineGame.carts)}
            trumpCart={toJS(myRootStore.onlineGame.trumpCart)}
            trump={toJS(myRootStore.onlineGame.trump)}
        ></TrumpElement>
        <BattleCards batleCards={toJS(myRootStore.onlineGame.batleCards)}></BattleCards>
        <div className={cl["otherplayers"]}>
            {toJS(myRootStore.onlineGame.players).map((player, index) => {
                if (index === 0){
                    return null
                }else{
                    return (
                        <div key={index}>
                            <PlayerElement
                                player={player}
                                isMove={(()=>{
                                    if (toJS(myRootStore.onlineGame.whoMove) === index){
                                        return stateOfPlayer['move']
                                    }else if(toJS(myRootStore.onlineGame.getDefPlayerIndex()) === index){
                                        return stateOfPlayer['def']
                                    }else {
                                        return stateOfPlayer['retr']
                                    }
                                })()}
                                ref={playersRefs[index]}
                                rerenderKey={playerRerenderKey}
                                setRerenderKey={setPlayerRerenderKey}
                                store={myRootStore.onlineGame}
                            ></PlayerElement>
                            <ButtonAction
                                title="Бито"
                                className={cl['otbuttonaction']}
                                onClick={handleAction}
                                ref={actionButtonRefs[index]}
                                dataPlayerindex={index}
                            ></ButtonAction>
                        </div>

                    )
                }
            })}
        </div>
        <div>
            <ButtonAction
                title="Бито"
                className={cl['mpbuttonaction']}
                onClick={handleAction}
                ref={actionButtonRefs[0]}
                dataPlayerindex={0}
            ></ButtonAction>
            <div className={cl["mainplayer"]}>
                <PlayerElement
                    player={toJS(myRootStore.onlineGame.players[0])}
                    isMove={(()=>{
                        if (toJS(myRootStore.onlineGame.whoMove) === 0){
                            return stateOfPlayer['move']
                        }else if(toJS(myRootStore.onlineGame.whoMove) === toJS(myRootStore.onlineGame.players.length)-1){
                            return stateOfPlayer['def']
                        }else {
                            return stateOfPlayer['retr']
                        }
                    })()}
                    ref={playersRefs[0]}
                    rerenderKey={playerRerenderKey}
                    setRerenderKey={setPlayerRerenderKey}
                    store={myRootStore.onlineGame}
                ></PlayerElement>
            </div>
        </div>
    </>)
})