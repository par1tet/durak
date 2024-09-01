import { useSearchParams } from "react-router-dom";
// import cl from './GameWithUSelf.module.css';
import { SettingsPanel } from "./components/SettingsPanel.tsx";
import { Game } from "./components/Game.tsx";

export const OnlineGame = () => {
    const [searchParams] = useSearchParams();

    // useEffect(() => {
    //     console.log(toJS(myRootStore.gameWithYourself.carts))
    //     console.log(toJS(myRootStore.gameWithYourself.players))
    //     console.log(toJS(myRootStore.gameWithYourself.scam))
    //     console.log(toJS(myRootStore.gameWithYourself.timeForMove))
    //     console.log(toJS(myRootStore.gameWithYourself.trump))
    //     console.log(toJS(myRootStore.gameWithYourself.typeGame))
    //     console.log(toJS(myRootStore.gameWithYourself.whoMove))
    //     console.log('/////////////////////////////')
    // }, [searchParams])

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