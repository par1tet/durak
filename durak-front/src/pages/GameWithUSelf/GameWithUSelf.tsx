import { useSearchParams } from "react-router-dom";
import cl from './GameWithUSelf.module.css';
import { useStore } from "../../hooks/useStore.ts";
import { rootStore } from "../../store/rootStore.ts";
import { useEffect, useRef } from "react";
import { SettingsPanel } from "./components/SettingsPanel.tsx";
import { Game } from "./components/Game.tsx";
import { toJS } from "mobx";

export const GameWithUSelf = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const myRootStore: rootStore = useStore()

    useEffect(() => {
        console.log(toJS(myRootStore.gameWithYourself.carts))
        console.log(toJS(myRootStore.gameWithYourself.players))
        console.log(toJS(myRootStore.gameWithYourself.scam))
        console.log(toJS(myRootStore.gameWithYourself.timeForMove))
        console.log(toJS(myRootStore.gameWithYourself.trump))
        console.log(toJS(myRootStore.gameWithYourself.typeGame))
        console.log(toJS(myRootStore.gameWithYourself.whoMove))
        console.log('/////////////////////////////')
    }, [searchParams])

    if(searchParams.get('isSetting') === 'true'){
        return (<>
            <SettingsPanel></SettingsPanel>
        </>)
    }else if((searchParams.get('isSetting') === 'false')){
        return (<>
            <Game></Game>
        </>)
    }else{
        return (<>
            Неверный запрос
        </>)
    }

}