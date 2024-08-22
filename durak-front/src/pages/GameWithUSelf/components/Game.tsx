import { DeckOfCarts } from "../../../components/DeckOfCarts"
import { useStore } from "../../../hooks/useStore"
import { rootStore } from "../../../store/rootStore"
import { toJS } from "mobx"

export const Game = ({}) => {
    const myRootStore: rootStore = useStore()

    return (<>
        <DeckOfCarts carts={toJS(myRootStore.gameWithYourself.players[0].carts)}></DeckOfCarts>
    </>)
}