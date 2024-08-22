import { Player } from "../utils/abstractClasses/player"
import { DeckOfCarts } from "./DeckOfCarts"

type propsPlayer = {
    player: Player
}

export const PlayerElement = ({player}: propsPlayer) => {
    return (<>
        <DeckOfCarts carts={player.carts}></DeckOfCarts>
    </>)
}