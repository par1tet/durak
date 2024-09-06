import { useRef } from "react";
import { ButtonPlay } from "../../../components/UI/button/ButtonPlay/ButtonPlay.tsx";
import { useStore } from "../../../hooks/useStore.ts";
import { rootStore } from "../../../store/rootStore.ts";
import cl from './../JoinGame.module.css';
import { Input } from "../../../components/UI/input/Input/Input.tsx";
import { canToJoinGame } from "../../../utils/api/canToJoinGame.ts";
import { socket } from "../../../socket/socket.ts";
import { createPlayersArray } from "../../../utils/functions/createPlayersArray.ts";
import { getGameData } from "../../../utils/api/getGameData.ts";
import { useNavigate } from "react-router-dom";

export const SettingsPanel = ({}) => {
    const myRootStore: rootStore = useStore()
    const settingsRef = useRef<HTMLDivElement>(null)
    const errorTextRef = useRef<HTMLSpanElement>(null)
    const navigate = useNavigate()

    async function handleStart(){
        if (settingsRef.current == null) return

        const token = (settingsRef.current.children[0] as HTMLInputElement).value
        const data = await canToJoinGame(token)
        if(data === 'not found'){
            if(errorTextRef.current == undefined) return 0
            errorTextRef.current.innerHTML = 'Такого токена не существует'
        }else if(data){
            await socket.connect()
            const gameData = (await getGameData(token))

            const newPlayer = createPlayersArray(1, gameData.carts, gameData.trump, gameData.trumpCart,
                (newValue) => {gameData.trumpCart = newValue})[0]
            console.log(newPlayer)

            gameData.players.push(newPlayer)
            console.log(gameData.trumpCart)

            await myRootStore.onlineGame.createOnlineGame(
                gameData.carts,
                gameData.players,
                gameData.trump,
                gameData.whoMove,
                gameData.typeGame,
                gameData.trumpCart,
                token,
                gameData.maxPlayers
            )
            console.log(gameData.players.length-1)
            myRootStore.onlineGame.setPointOfView(gameData.players.length-1)
            
            await socket.emit("joinGame", {
                token: token,
                carts: gameData.carts.join('/'),
                players: gameData.players.join('|'),
                whoMove: gameData.whoMove,
                trumpCart: gameData.trumpCart != undefined ? (gameData.trumpCart as any).toString() : '',
            })

            navigate('/onlinegame?isSetting=false')
        }else if(data === false){
            if(errorTextRef.current == undefined) return 0
            errorTextRef.current.innerHTML = 'Игра уже запущена'
        }
    }

    return (<>
        <div className={cl['creategame']}>
            <div className={cl['error-text']}>
                <span ref={errorTextRef}></span>
            </div>
            <div className={cl['creategame__settings']} ref={settingsRef}>
                <Input width={320} height={120} center={true} placeholder='Ввидите токен комнаты'></Input>
            </div>
            <div>
                <ButtonPlay onClick={(handleStart as any)}>
                    Присоединиться
                </ButtonPlay>
            </div>
        </div>
    </>)
}