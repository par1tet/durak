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
import { getGameData } from "../../../utils/api/getGameData";
import { OnlineAnotherPlayer } from "../../../components/OnlineAnotherPlayer";
import { Cart } from "../../../utils/abstractClasses/cart";

export const Game = observer(({}) => {
    const myRootStore: rootStore = useStore()
    const actionButtonRef = useRef(null)
    const playersRef = useRef(null)
    const [playerRerenderKey, setPlayerRerenderKey] = useState(1)

    function handleDragEnd(e: React.DragEvent<HTMLImageElement>, cart: Cart): undefined{
        if(myRootStore.onlineGame.winners.length === (myRootStore.onlineGame.players.length - 1)){
            return undefined
        }

        const elementFromPoint = document.elementFromPoint(e.clientX, e.clientY)
        if (elementFromPoint === null) { return undefined }
        if ((elementFromPoint.attributes as any)['data-index'] === undefined) return undefined
        const indexOfCartBuild: number = +((elementFromPoint.attributes as any)['data-index'].value)

        const isMove = (()=>{
            if (toJS(myRootStore.onlineGame.whoMove) === myRootStore.onlineGame.pointOfView){
                return stateOfPlayer['move']
            }else if(0 === myRootStore.onlineGame.getDefPlayerIndex()){
                return stateOfPlayer['def']
            }else {
                return stateOfPlayer['retr']
            }
        })()
        switch (isMove){
            case stateOfPlayer['move']:{
                // если атакующий игрок

                if(myRootStore.onlineGame.changeBatleCards(indexOfCartBuild, cart) === 0){
                    myRootStore.onlineGame.players[0].removeCart(cart)
                }

                socket.emit('movePlayer', {
                    token: myRootStore.onlineGame.token,
                    batleCarts: myRootStore.onlineGame.batleCards
                    .map(cart => {
                        if(cart){
                            return cart.toString()
                        }else{
                            return '0'
                        }
                    }).join('/'),
                    carts: myRootStore.onlineGame.carts.join('/'),
                    players: myRootStore.onlineGame.players.join('|'),
                    whoMove: myRootStore.onlineGame.whoMove,
                    winners: myRootStore.onlineGame.winners.join('|'),
                    trumpCart: myRootStore.onlineGame.trumpCart != null ? (myRootStore.onlineGame.trumpCart as any).toString() : "0",
                })
                break;
            }
            case stateOfPlayer['def']:{
                // если защищающийся игрок
                console.log('def player')
                switch(myRootStore.onlineGame.changeDefCards(indexOfCartBuild, cart)){
                    case 0:
                        // если защищает

                        break;
                    case 1:
                        // если переводит

                        break
                    default:
                        console.log('dont beaten')
                        break;
                }
                break;
            }
            case stateOfPlayer['retr']:{
                // если подкидывающий игрок

                break;
            }
        }
    }

    useEffect(() => {
        socket.on('moveOfPlayer', async data => {
            const newData = (await getGameData(myRootStore.onlineGame.token))

            myRootStore.onlineGame.createOnlineGame(
                newData.carts,
                newData.players,
                newData.trump,
                newData.whoMove,
                newData.typeGame,
                newData.trumpCart,
                myRootStore.onlineGame.token,
                newData.maxPlayers,
                newData.batleCarts
            )
        })

        socket.on('joinNewPlayer', async data => {
            const newData = (await getGameData(myRootStore.onlineGame.token))

            // обновляем стейт когда получаешь обновленые данные
            myRootStore.onlineGame.createOnlineGame(
                newData.carts,
                newData.players,
                newData.trump,
                newData.whoMove,
                newData.typeGame,
                newData.trumpCart,
                myRootStore.onlineGame.token,
                newData.maxPlayers
            )
        })
    }, [socket])

    useEffect(() => {
        if(myRootStore.onlineGame.maxPlayers !== myRootStore.onlineGame.players.length){
            (actionButtonRef.current as any).classList.add(cl['buttonaction-notactive'])
            return undefined
        }
        if(myRootStore.onlineGame.winners.length === (myRootStore.onlineGame.players.length - 1)){
            return undefined
        }
        if  (myRootStore.onlineGame.getDefPlayerIndex() === myRootStore.onlineGame.pointOfView)
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
                (actionButtonRef.current as any).classList.remove(cl['buttonaction-notactive']);
                (actionButtonRef.current as any).innerHTML = 'Взять';
            }else{
                (actionButtonRef.current as any).classList.add(cl['buttonaction-notactive'])
            }
        }else if (myRootStore.onlineGame.whoMove === myRootStore.onlineGame.pointOfView){
            // если атакующий игрок
            if (myRootStore.onlineGame.isBeaten()){
                (actionButtonRef.current as any).classList.remove(cl['buttonaction-notactive']);
                (actionButtonRef.current as any).innerHTML = 'Бито';
            }else{
                (actionButtonRef.current as any).classList.add(cl['buttonaction-notactive'])
            }
        }else{
            // если подкидывающий игрок
            (actionButtonRef.current as any).classList.add(cl['buttonaction-notactive'])
        }
    }, [myRootStore.onlineGame.batleCards])

    function handleAction(e: React.MouseEvent<HTMLButtonElement>){
        console.log(localStorage.getItem('gameToken'))
        console.log(localStorage.getItem('playerCarts'))

        console.log(socket.connected)
    }
    console.log(toJS(myRootStore.onlineGame.players[toJS(myRootStore.onlineGame.pointOfView)]))
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
                    <BattleCards batleCards={myRootStore.onlineGame.batleCards}></BattleCards>
                )
            }
        })()}
        <div className={cl["otherplayers"]}>
            {myRootStore.onlineGame.players.map((player, index) => {
                if (index === myRootStore.onlineGame.pointOfView){
                    return null
                }else{
                    return (
                        <div key={index}>
                            <OnlineAnotherPlayer
                                player={player}
                                isMove={(()=>{
                                    if (myRootStore.onlineGame.whoMove === index){
                                        return stateOfPlayer['move']
                                    }else if(index === myRootStore.onlineGame.getDefPlayerIndex()){
                                        return stateOfPlayer['def']
                                    }else {
                                        return stateOfPlayer['retr']
                                    }
                                })()}
                            ></OnlineAnotherPlayer>
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
                    player={myRootStore.onlineGame.players[myRootStore.onlineGame.pointOfView]}
                    isMove={(()=>{
                        if (myRootStore.onlineGame.whoMove === myRootStore.onlineGame.pointOfView){
                            return stateOfPlayer['move']
                        }else if(myRootStore.onlineGame.getDefPlayerIndex() === myRootStore.onlineGame.pointOfView){
                            return stateOfPlayer['def']
                        }else {
                            return stateOfPlayer['retr']
                        }
                    })()}
                    ref={playersRef}
                    rerenderKey={playerRerenderKey}
                    setRerenderKey={setPlayerRerenderKey}
                    store={myRootStore.onlineGame}
                    handleDragEnd={handleDragEnd}
                ></PlayerElement>
            </div>
        </div>
    </>)
})