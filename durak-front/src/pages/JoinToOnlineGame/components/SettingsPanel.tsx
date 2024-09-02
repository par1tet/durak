import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ButtonPlay } from "../../../components/UI/button/ButtonPlay/ButtonPlay.tsx";
import { InputNumber } from "../../../components/UI/input/InputNumber/InputNumber.tsx";
import { useStore } from "../../../hooks/useStore.ts";
import { rootStore } from "../../../store/rootStore.ts";
import cl from './../JoinGame.module.css';
import { Input } from "../../../components/UI/input/Input/Input.tsx";
import { canToJoinGame } from "../../../utils/api/canToJoinGame.ts";
import { socket } from "../../../socket/socket.ts";
import { createPlayersArray } from "../../../utils/functions/createPlayersArray.ts";
import { toJS } from "mobx";
import { getGameData } from "../../../utils/api/getGameData.ts";

export const SettingsPanel = ({}) => {
    const myRootStore: rootStore = useStore()
    const settingsRef = useRef<HTMLDivElement>(null)

    async function handleStart(){
        if (settingsRef.current == null) return

        const token = (settingsRef.current.children[0] as HTMLInputElement).value
        const data = await canToJoinGame(token)
        console.log(data)
        if(data){
            console.log('test')
            await socket.connect()
            console.log(await getGameData(token))

            await socket.emit("add_player", {
                token: token,
                playerCarts: createPlayersArray(1,toJS(myRootStore.onlineGame.carts),toJS(myRootStore.onlineGame.trump)),
                carts: myRootStore.onlineGame.carts
            })
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