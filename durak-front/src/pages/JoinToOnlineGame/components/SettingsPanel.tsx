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
    const navigate = useNavigate()

    async function handleStart(){
        if (settingsRef.current == null) return

        const token = (settingsRef.current.children[0] as HTMLInputElement).value
        const data = await canToJoinGame(token)
        if(data){
            await socket.connect()
            const gameData = (await getGameData(token))

            const newPlayer = createPlayersArray(1, gameData.carts, gameData.trump)[0]
            console.log(newPlayer)

            gameData.players.push(newPlayer)

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
                trumpCart: gameData.trumpCart.toString(),
            })

            navigate('/onlinegame?isSetting=false')
        }
    }

    return (<>
        <div className={cl['creategame']}>
            <div className={cl['creategame__settings']} ref={settingsRef}>
                <Input width={320} height={120} center={true}></Input>
            </div>
            <div>
                <ButtonPlay onClick={(handleStart as any)}>
                    Присоединиться
                </ButtonPlay>
            </div>
        </div>
    </>)
}