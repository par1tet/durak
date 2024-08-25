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


export const Game = observer(({}) => {
    const myRootStore: rootStore = useStore()
    const actionButtonRefs = createArrayRefs(toJS(myRootStore.gameWithYourself.players.length))
    const playersRefs = createArrayRefs(toJS(myRootStore.gameWithYourself.players.length))

    function handleAction(e: React.MouseEvent<HTMLButtonElement>){

    }

    useEffect(() => {
        for (let i = 0;i !== actionButtonRefs.length;i++){
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
                            ></PlayerElement>
                            <ButtonAction
                                title="Бито"
                                className={cl['otbuttonaction']}
                                onClick={handleAction}
                                ref={actionButtonRefs[index]}
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
                ></PlayerElement>
            </div>
        </div>
    </>)
})