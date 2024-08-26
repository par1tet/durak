import { useStore } from "../../../hooks/useStore"
import { rootStore } from "../../../store/rootStore"
import { PlayerElement } from "../../../components/Player"
import cl from './../GameWithUSelf.module.css';
import { toJS } from "mobx"
import { TrumpElement } from "../../../components/TrumpElement";
import { BattleCards } from "../../../components/BattleCards";
import { stateOfPlayer } from "../../../utils/enums/stateOfPlayer";
import { observer } from "mobx-react-lite";
import { ButtonAction } from "../../../components/UI/button/ButtonAction/ButtonAction";
import { useEffect, useRef } from "react";
import { createArrayRefs } from "../../../utils/functions/createArrayRefs";
import { useState } from "react";

export const Game = observer(({}) => {
    const myRootStore: rootStore = useStore()
    const actionButtonRefs = createArrayRefs(toJS(myRootStore.gameWithYourself.players.length))
    const playersRefs = createArrayRefs(toJS(myRootStore.gameWithYourself.players.length))
    const [playerRerenderKey, setPlayerRerenderKey] = useState(1)

    function handleAction(e: React.MouseEvent<HTMLButtonElement>){
        const playerIndex:number = +(e.target as any).attributes.getNamedItem('data-playerindex').value
        if  (myRootStore.gameWithYourself.whoMove + 1 === playerIndex
            ||
            (myRootStore.gameWithYourself.whoMove === myRootStore.gameWithYourself.players.length - 1 && playerIndex === 0))
        {
            // передаем карты со стола, игроку
            for(let i = 0;i !== myRootStore.gameWithYourself.batleCards.length;i++) {
                if (myRootStore.gameWithYourself.batleCards[i]) {
                    if((myRootStore.gameWithYourself.batleCards[i] as any).length === 1){
                        myRootStore.gameWithYourself.players[playerIndex].carts.push((myRootStore.gameWithYourself.batleCards[i] as any)[0])
                    }else{
                        myRootStore.gameWithYourself.players[playerIndex].carts.push((myRootStore.gameWithYourself.batleCards[i] as any)[0])
                        myRootStore.gameWithYourself.players[playerIndex].carts.push((myRootStore.gameWithYourself.batleCards[i] as any)[1])
                    }
                }
            }

            // очищаем стол
            myRootStore.gameWithYourself.clearBatleCarts()

            // передаем карты главному игроку
            myRootStore.gameWithYourself.replenishCards(toJS(myRootStore.gameWithYourself.whoMove))

            // передаем очередь
            myRootStore.gameWithYourself.setWhoMove(prev => prev + 2)

            // обновляем игрока
            setPlayerRerenderKey(prev => prev + 1)
        }
    }

    useEffect(() => {
        console.log(toJS(myRootStore.gameWithYourself.whoMove))
        for (let i = 0;i !== actionButtonRefs.length;i++){
            if  (myRootStore.gameWithYourself.whoMove + 1 === i
                ||
                (myRootStore.gameWithYourself.whoMove === myRootStore.gameWithYourself.players.length - 1 && i === 0))
            {
                let isGetAction:boolean = false;

                for(let i = 0;i !== myRootStore.gameWithYourself.batleCards.length;i++) {
                    if (myRootStore.gameWithYourself.batleCards[i]) {
                        if((myRootStore.gameWithYourself.batleCards[i] as any).length === 1){
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

                return
            }
            let isBatleCarts:boolean = false;

            for(let i = 0;i !== myRootStore.gameWithYourself.batleCards.length;i++) {
                if (myRootStore.gameWithYourself.batleCards[i]) {
                    if((myRootStore.gameWithYourself.batleCards[i] as any).length === 2){
                        isBatleCarts = true
                    }else{
                        isBatleCarts = false
                        break
                    }
                }
            }
    
            if (isBatleCarts){
                (actionButtonRefs[i].current as any).classList.remove(cl['buttonaction-notactive'])
            }else{
                (actionButtonRefs[i].current as any).classList.add(cl['buttonaction-notactive'])
            }
        }
    }, [toJS(myRootStore.gameWithYourself.batleCards)])

    return (<>
        <TrumpElement></TrumpElement>
        <BattleCards></BattleCards>
        <div className={cl["otherplayers"]}>
            {toJS(myRootStore.gameWithYourself.players).map((player, index) => {
                if (index === 0){
                    return null
                }else{
                    return (
                        <div key={index}>
                            <PlayerElement
                                player={player}
                                isMove={(()=>{
                                    if (toJS(myRootStore.gameWithYourself.whoMove) === index){
                                        return stateOfPlayer['move']
                                    }else if(toJS(myRootStore.gameWithYourself.whoMove) === index - 1){
                                        return stateOfPlayer['def']
                                    }else {
                                        return stateOfPlayer['retr']
                                    }
                                })()}
                                ref={playersRefs[index]}
                                rerenderKey={playerRerenderKey}
                                setRerenderKey={setPlayerRerenderKey}
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
                    player={toJS(myRootStore.gameWithYourself.players[0])}
                    isMove={(()=>{
                        if (toJS(myRootStore.gameWithYourself.whoMove) === 0){
                            return stateOfPlayer['move']
                        }else if(toJS(myRootStore.gameWithYourself.whoMove) === toJS(myRootStore.gameWithYourself.players.length)-1){
                            return stateOfPlayer['def']
                        }else {
                            return stateOfPlayer['retr']
                        }
                    })()}
                    ref={playersRefs[0]}
                    rerenderKey={playerRerenderKey}
                    setRerenderKey={setPlayerRerenderKey}
                ></PlayerElement>
            </div>
        </div>
    </>)
})