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
import { Cart } from "../../../utils/abstractClasses/cart";

export const Game = observer(({}) => {
    const myRootStore: rootStore = useStore()
    const actionButtonRef = useRef(null)

    function handleAction(e: React.MouseEvent<HTMLButtonElement>){

    }

    useEffect(() => {
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

        console.log(isBatleCarts)

        if (isBatleCarts){
            (actionButtonRef.current as any).classList.remove(cl['buttonaction-notactive'])
        }else{
            (actionButtonRef.current as any).classList.add(cl['buttonaction-notactive'])
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
                        <PlayerElement
                            key={index}
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
                        ></PlayerElement>
                    )
                }
            })}
        </div>
        <div>
            <ButtonAction
                title="Бито"
                className={cl['mpbuttonaction']}
                onClick={handleAction}
                ref={actionButtonRef}
            ></ButtonAction>
            <div
                className={cl["mainplayer"]}
            >
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
                ></PlayerElement>
            </div>
        </div>

    </>)
})