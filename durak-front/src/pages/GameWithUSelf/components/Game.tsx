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
import cl from './../GameWithUSelf.module.css';

export const Game = observer(({}) => {
    const myRootStore: rootStore = useStore()
    const actionButtonRefs = createArrayRefs(toJS(myRootStore.gameWithYourself.players.length))
    const playersRefs = createArrayRefs(toJS(myRootStore.gameWithYourself.players.length))
    const [playerRerenderKey, setPlayerRerenderKey] = useState(1)

    function handleAction(e: React.MouseEvent<HTMLButtonElement>){
        const playerIndex:number = +(e.target as any).attributes.getNamedItem('data-playerindex').value
        if  (myRootStore.gameWithYourself.getDefPlayerIndex() === playerIndex)
        {
            // если защищающийся игрок
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

            // передаем карты атакаущиему игроку
            myRootStore.gameWithYourself.replenishCards(toJS(myRootStore.gameWithYourself.whoMove))
            myRootStore.gameWithYourself.players[toJS(myRootStore.gameWithYourself.whoMove)].sortCarts(myRootStore.gameWithYourself.trump)

            // передаем карты остальным игрокам
            for (let i: number = 0;i !== toJS(myRootStore.gameWithYourself.players.length);i++){
                if(toJS(myRootStore.gameWithYourself.whoMove) === i){
                }else if(toJS(myRootStore.gameWithYourself.whoMove) + 1 === i){
                }else{
                    myRootStore.gameWithYourself.replenishCards(i)
                    myRootStore.gameWithYourself.players[i].sortCarts(myRootStore.gameWithYourself.trump)
                }
            }

            // передаем очередь
            for(let i = 2;;i++){
                if (myRootStore.gameWithYourself.players[myRootStore.gameWithYourself.getNextWhoMove(prev => prev + i)].isWin){
                }else{
                    myRootStore.gameWithYourself.setWhoMove(prev => prev + i)
                    break
                }
            }
        } else if(myRootStore.gameWithYourself.whoMove === playerIndex){
            // если нажал атакующий игрок

            // очищаем стол
            myRootStore.gameWithYourself.clearBatleCarts()

            // передаем карты атакаущиему игроку
            myRootStore.gameWithYourself.replenishCards(toJS(myRootStore.gameWithYourself.whoMove))

            // передаем карты остальным игрокам
            for (let i: number = 0;i !== toJS(myRootStore.gameWithYourself.players.length);i++){
                myRootStore.gameWithYourself.replenishCards(i)
            }

            // передаем очередь
            for(let i = 1;;i++){
                if (myRootStore.gameWithYourself.players[myRootStore.gameWithYourself.getNextWhoMove(prev => prev + i)].isWin){
                }else{
                    myRootStore.gameWithYourself.setWhoMove(prev => prev + i)
                    break
                }
            }
        }
        // обновляем игроков
        myRootStore.gameWithYourself.players[playerIndex].sortCarts(myRootStore.gameWithYourself.trump)
        setPlayerRerenderKey(prev => prev + 1)
    }

    useEffect(() => {
        if(myRootStore.gameWithYourself.winners.length === (myRootStore.gameWithYourself.players.length - 1)){
            return undefined
        }
        for (let i = 0;i !== actionButtonRefs.length;i++){
            if  (myRootStore.gameWithYourself.getDefPlayerIndex() === i)
            {
                // если защищаюшийся игрок
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
            }else if (toJS(myRootStore.gameWithYourself.whoMove) === i){
                // если атакующий игрок
                if (myRootStore.gameWithYourself.isBeaten()){
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
            carts={toJS(myRootStore.gameWithYourself.carts)}
            trumpCart={toJS(myRootStore.gameWithYourself.trumpCart)}
            trump={toJS(myRootStore.gameWithYourself.trump)}
        ></TrumpElement>
        <BattleCards batleCards={toJS(myRootStore.gameWithYourself.batleCards)} store={myRootStore.gameWithYourself} myRootStore={myRootStore} setRerenderKey={setPlayerRerenderKey}></BattleCards>
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
                                    }else if(toJS(myRootStore.gameWithYourself.getDefPlayerIndex()) === index){
                                        return stateOfPlayer['def']
                                    }else {
                                        return stateOfPlayer['retr']
                                    }
                                })()}
                                ref={playersRefs[index]}
                                rerenderKey={playerRerenderKey}
                                setRerenderKey={setPlayerRerenderKey}
                                store={myRootStore.gameWithYourself}
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
                    store={myRootStore.gameWithYourself}
                ></PlayerElement>
            </div>
        </div>
    </>)
})