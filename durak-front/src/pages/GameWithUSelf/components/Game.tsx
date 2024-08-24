import { useStore } from "../../../hooks/useStore"
import { rootStore } from "../../../store/rootStore"
import { PlayerElement } from "../../../components/Player"
import cl from './../GameWithUSelf.module.css';
import { observable, toJS } from "mobx"
import { TrumpElement } from "../../../components/TrumpElement";
import { BattleCards } from "../../../components/BattleCards";
import { stateOfPlayer } from "../../../utils/enums/stateOfPlayer";
import { observer } from "mobx-react-lite";

export const Game = observer(({}) => {
    const myRootStore: rootStore = useStore()

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
            ></PlayerElement>
        </div>
    </>)
})