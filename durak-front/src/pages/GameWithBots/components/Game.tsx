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
import cl from './../GameWithBots.module.css';

export const Game = observer(({}) => {
    const myRootStore: rootStore = useStore()
    const actionButtonRefs = createArrayRefs(toJS(myRootStore.gameWithBots.players.length))
    const playersRefs = createArrayRefs(toJS(myRootStore.gameWithBots.players.length))
    const [playerRerenderKey, setPlayerRerenderKey] = useState(1)

    function handleAction(e: React.MouseEvent<HTMLButtonElement>){
        const playerIndex:number = +(e.target as any).attributes.getNamedItem('data-playerindex').value
        if  (myRootStore.gameWithBots.getDefPlayerIndex() === playerIndex)
        {
            // если защищающийся игрок
            // передаем карты со стола, игроку
            for(let i = 0;i !== myRootStore.gameWithBots.batleCards.length;i++) {
                if (myRootStore.gameWithBots.batleCards[i]) {
                    if((myRootStore.gameWithBots.batleCards[i] as any).length === 1){
                        myRootStore.gameWithBots.players[playerIndex].carts.push((myRootStore.gameWithBots.batleCards[i] as any)[0])
                    }else{
                        myRootStore.gameWithBots.players[playerIndex].carts.push((myRootStore.gameWithBots.batleCards[i] as any)[0])
                        myRootStore.gameWithBots.players[playerIndex].carts.push((myRootStore.gameWithBots.batleCards[i] as any)[1])
                    }
                }
            }

            // очищаем стол
            myRootStore.gameWithBots.clearBatleCarts()

            // передаем карты атакаущиему игроку
            myRootStore.gameWithBots.replenishCards(toJS(myRootStore.gameWithBots.whoMove))
            myRootStore.gameWithBots.players[toJS(myRootStore.gameWithBots.whoMove)].sortCarts(myRootStore.gameWithBots.trump)

            // передаем карты остальным игрокам
            for (let i: number = 0;i !== toJS(myRootStore.gameWithBots.players.length);i++){
                if(toJS(myRootStore.gameWithBots.whoMove) === i){
                }else if(toJS(myRootStore.gameWithBots.whoMove) + 1 === i){
                }else{
                    myRootStore.gameWithBots.replenishCards(i)
                    myRootStore.gameWithBots.players[i].sortCarts(myRootStore.gameWithBots.trump)
                }
            }

            // передаем очередь
            for(let i = 2;;i++){
                if (myRootStore.gameWithBots.players[myRootStore.gameWithBots.getNextWhoMove(prev => prev + i)].isWin){
                }else{
                    myRootStore.gameWithBots.setWhoMove(prev => prev + i)
                    break
                }
            }
        } else if(myRootStore.gameWithBots.whoMove === playerIndex){
            // если нажал атакующий игрок

            // очищаем стол
            myRootStore.gameWithBots.clearBatleCarts()

            // передаем карты атакаущиему игроку
            myRootStore.gameWithBots.replenishCards(toJS(myRootStore.gameWithBots.whoMove))

            // передаем карты остальным игрокам
            for (let i: number = 0;i !== toJS(myRootStore.gameWithBots.players.length);i++){
                myRootStore.gameWithBots.replenishCards(i)
            }

            // передаем очередь
            for(let i = 1;;i++){
                if (myRootStore.gameWithBots.players[myRootStore.gameWithBots.getNextWhoMove(prev => prev + i)].isWin){
                }else{
                    myRootStore.gameWithBots.setWhoMove(prev => prev + i)
                    break
                }
            }
        }
        // обновляем игроков
        myRootStore.gameWithBots.players[playerIndex].sortCarts(myRootStore.gameWithBots.trump)
        setPlayerRerenderKey(prev => prev + 1)
    }

    useEffect(() => {
        if(myRootStore.gameWithBots.winners.length === (myRootStore.gameWithBots.players.length - 1)){
            return undefined
        }
        for (let i = 0;i !== actionButtonRefs.length;i++){
            if  (myRootStore.gameWithBots.getDefPlayerIndex() === i)
            {
                // если защищаюшийся игрок
                let isGetAction:boolean = false;

                for(let i = 0;i !== myRootStore.gameWithBots.batleCards.length;i++) {
                    if (myRootStore.gameWithBots.batleCards[i]) {
                        if((myRootStore.gameWithBots.batleCards[i] as any).length === 1){
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
            }else if (toJS(myRootStore.gameWithBots.whoMove) === i){
                // если атакующий игрок
                if (myRootStore.gameWithBots.isBeaten()){
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
            carts={toJS(myRootStore.gameWithBots.carts)}
            trumpCart={toJS(myRootStore.gameWithBots.trumpCart)}
            trump={toJS(myRootStore.gameWithBots.trump)}
        ></TrumpElement>
        <BattleCards batleCards={toJS(myRootStore.gameWithBots.batleCards)}></BattleCards>
        <div className={cl["otherplayers"]}>
            {toJS(myRootStore.gameWithBots.players).map((player, index) => {
                if (index === 0){
                    return null
                }else{
                    return (
                        <div key={index}>
                            <PlayerElement
                                player={player}
                                isMove={(()=>{
                                    if (toJS(myRootStore.gameWithBots.whoMove) === index){
                                        return stateOfPlayer['move']
                                    }else if(toJS(myRootStore.gameWithBots.getDefPlayerIndex()) === index){
                                        return stateOfPlayer['def']
                                    }else {
                                        return stateOfPlayer['retr']
                                    }
                                })()}
                                ref={playersRefs[index]}
                                rerenderKey={playerRerenderKey}
                                setRerenderKey={setPlayerRerenderKey}
                                store={myRootStore.gameWithBots}
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
                    player={toJS(myRootStore.gameWithBots.players[0])}
                    isMove={(()=>{
                        if (toJS(myRootStore.gameWithBots.whoMove) === 0){
                            return stateOfPlayer['move']
                        }else if(toJS(myRootStore.gameWithBots.whoMove) === toJS(myRootStore.gameWithBots.players.length)-1){
                            return stateOfPlayer['def']
                        }else {
                            return stateOfPlayer['retr']
                        }
                    })()}
                    ref={playersRefs[0]}
                    rerenderKey={playerRerenderKey}
                    setRerenderKey={setPlayerRerenderKey}
                    store={myRootStore.gameWithBots}
                ></PlayerElement>
            </div>
        </div>
    </>)
})