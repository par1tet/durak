import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { BattleCards } from "../../../components/BattleCards";
import { PlayerElement } from "../../../components/Player";
import { TrumpElement } from "../../../components/TrumpElement";
import { ButtonAction } from "../../../components/UI/button/ButtonAction/ButtonAction";
import { useStore } from "../../../hooks/useStore";
import { rootStore } from "../../../store/rootStore";
import { stateOfPlayer } from "../../../utils/enums/stateOfPlayer";
import cl from './../OnlineGame.module.css';
import { socket } from "../../../socket/socket";

export const Game = observer(({}) => {
    const myRootStore: rootStore = useStore()
    const actionButtonRef = useRef(null)
    const playersRef = useRef(null)
    const [playerRerenderKey, setPlayerRerenderKey] = useState(1)

    console.log(localStorage.getItem('gameToken'))
    console.log(localStorage.getItem('playerCarts'))

    function handleAction(e: React.MouseEvent<HTMLButtonElement>){
        console.log(localStorage.getItem('gameToken'))
        console.log(localStorage.getItem('playerCarts'))

        console.log(socket.connected)
    }

    return (<>
        <TrumpElement
            carts={toJS(myRootStore.onlineGame.carts)}
            trumpCart={toJS(myRootStore.onlineGame.trumpCart)}
            trump={toJS(myRootStore.onlineGame.trump)}
        ></TrumpElement>
        {(()=>{
            if (myRootStore.onlineGame.players.length !== myRootStore.onlineGame.maxPlayers){
                return (<div className={cl['tokengame']}>
                    <span>
                        Токен комнаты для присоеденения
                    </span>
                    <span>
                        {toJS(myRootStore.onlineGame.token)}
                    </span>
                </div>)
            }else{
                return (
                    <BattleCards batleCards={toJS(myRootStore.onlineGame.batleCards)}></BattleCards>
                )
            }
        })()}
        <div className={cl["otherplayers"]}>
            {toJS(myRootStore.onlineGame.players).map((player, index) => {
                if (index === 0){
                    return null
                }else{
                    return (
                        <div key={index}>
                            
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
                ref={actionButtonRef}
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
                    ref={playersRef}
                    rerenderKey={playerRerenderKey}
                    setRerenderKey={setPlayerRerenderKey}
                    store={myRootStore.onlineGame}
                ></PlayerElement>
            </div>
        </div>
    </>)
})