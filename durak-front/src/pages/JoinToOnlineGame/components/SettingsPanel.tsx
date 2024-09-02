import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ButtonPlay } from "../../../components/UI/button/ButtonPlay/ButtonPlay.tsx";
import { InputNumber } from "../../../components/UI/input/InputNumber/InputNumber.tsx";
import { useStore } from "../../../hooks/useStore.ts";
import { rootStore } from "../../../store/rootStore.ts";
import cl from './../JoinGame.module.css';
import { Input } from "../../../components/UI/input/Input/Input.tsx";
import { canToJoinGame } from "../../../utils/api/canToJoinGame.ts";

export const SettingsPanel = ({}) => {
    const settingsRef = useRef<HTMLDivElement>(null)

    async function handleStart(){
        if (settingsRef.current == null) return

        console.log((settingsRef.current.children[0] as HTMLInputElement).value)
        console.log(canToJoinGame((settingsRef.current.children[0] as HTMLInputElement).value))
    }

    return (<>
        <div className={cl['creategame']}>
            <div className={cl['creategame__settings']} ref={settingsRef}>
                <Input width={320} height={120} center={true}></Input>
            </div>
            <div>
                <ButtonPlay onClick={(handleStart as any)}>
                    Запустить
                </ButtonPlay>
            </div>
        </div>
    </>)
}