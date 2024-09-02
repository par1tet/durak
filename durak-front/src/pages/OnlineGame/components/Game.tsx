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

    useEffect(() => {
        // if(myRootStore.onlineGame.winners.length === (myRootStore.onlineGame.players.length - 1)){
        //     return undefined
        // }
        // if  (myRootStore.onlineGame.getDefPlayerIndex() === i)
        // {
        //     // если защищаюшийся игрок
        //     let isGetAction:boolean = false;

        //     for(let i = 0;i !== myRootStore.onlineGame.batleCards.length;i++) {
        //         if (myRootStore.onlineGame.batleCards[i]) {
        //             if((myRootStore.onlineGame.batleCards[i] as any).length === 1){
        //                 isGetAction = true
        //                 break
        //             }else{
        //                 isGetAction = false
        //             }
        //         }
        //     }

        //     if (isGetAction){
        //         (actionButtonRef.current as any).classList.remove(cl['buttonaction-notactive']);
        //         (actionButtonRef.current as any).innerHTML = 'Взять';
        //     }else{
        //         (actionButtonRef.current as any).classList.add(cl['buttonaction-notactive'])
        //     }
        // }else if (toJS(myRootStore.onlineGame.whoMove) === i){
        //     // если атакующий игрок
        //     if (myRootStore.onlineGame.isBeaten()){
        //         (actionButtonRef.current as any).classList.remove(cl['buttonaction-notactive']);
        //         (actionButtonRef.current as any).innerHTML = 'Бито';
        //     }else{
        //         (actionButtonRef.current as any).classList.add(cl['buttonaction-notactive'])
        //     }
        // }else{
        //     // если подкидывающий игрок
        //     (actionButtonRef.current as any).classList.add(cl['buttonaction-notactive'])
        // }
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