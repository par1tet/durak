import { useStore } from "../../../hooks/useStore"
import { rootStore } from "../../../store/rootStore"
import { PlayerElement } from "../../../components/Player"
import cl from './../GameWithUSelf.module.css';
import { toJS } from "mobx"
import { TrumpElement } from "../../../components/TrumpElement";

export const Game = ({}) => {
    const myRootStore: rootStore = useStore()

    return (<>
        <TrumpElement></TrumpElement>
        <div className={cl["otherplayers"]}>
            {toJS(myRootStore.gameWithYourself.players).map((player, index) => {
                if (index === 0){
                    return null
                }else{
                    return (
                        <PlayerElement
                            key={`${player.carts}`}
                            player={player}
                        ></PlayerElement>
                    )
                }
            })}
        </div>
        <div className={cl["mainplayer"]}>
            <PlayerElement
                player={toJS(myRootStore.gameWithYourself.players[0])}
            ></PlayerElement>
        </div>
    </>)
}