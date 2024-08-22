import { useStore } from "../../../hooks/useStore"
import { rootStore } from "../../../store/rootStore"
import { PlayerElement } from "../../../components/Player"
import { toJS } from "mobx"

export const Game = ({}) => {
    const myRootStore: rootStore = useStore()

    return (<>
        <PlayerElement player={toJS(myRootStore.gameWithYourself.players[0])}></PlayerElement>
    </>)
}