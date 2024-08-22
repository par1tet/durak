import { InputNumber } from "../../../components/UI/input/InputNumber/InputNumber.tsx";
import { SelectOption } from "../../../components/UI/select/SelectOption/SelectOption.tsx";
import { ButtonPlay } from "../../../components/UI/button/ButtonPlay/ButtonPlay.tsx";
import { Setting } from "./Setting.tsx";
import { rootStore } from "../../../store/rootStore.ts";
import { useStore } from "../../../hooks/useStore.ts";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import cl from './../GameWithUSelf.module.css';
import { shuffle } from "../../../utils/functions/shuffle.ts";
import { Trump } from "../../../utils/enums/trump.ts";
import { Cart } from "../../../utils/abstractClasses/cart.ts";
import { createCartsArray } from "../../../utils/functions/createCartsArray.ts";
import { createPlayersArray } from "../../../utils/functions/createPlayesArray.ts";

export const SettingsPanel = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const myRootStore: rootStore = useStore()
    const settingsRef = useRef<HTMLDivElement>(null)

    function handleStart(): undefined {
        if (!settingsRef.current) return undefined;// проверка что ref не null

        // создаем массив карт
        const cartsArray: Cart[] = createCartsArray(+((settingsRef.current.children[0].children[1] as HTMLInputElement).value))
        shuffle(cartsArray)

        // создаем массив игроков
        const playersArray = createPlayersArray(
            +((settingsRef.current.children[1].children[1] as HTMLInputElement).value),
            cartsArray
        )

        // получаем козырь
        let trump: Trump = Trump['rand']
        switch((settingsRef.current.children[2].children[1] as HTMLInputElement).value){
            case 'diamonds':
                trump = Trump['diamonds']
                break;
            case 'hearts':
                trump = Trump['hearts']
                break;
            case 'spades':
                trump = Trump['spades']
                break;
            case 'clubs':
                trump = Trump['clubs']
                break;
        }

        // получаем время на ход
        const timeForMove = (settingsRef.current.children[3].children[1] as HTMLInputElement).value

        // получаем тип игры
        const typeGame = (settingsRef.current.children[4].children[1] as HTMLInputElement).value

        // получаем жульничевство
        let isScam:  boolean = false
        if((settingsRef.current.children[5].children[1] as HTMLInputElement).value === 'true'){
            isScam = true
        }

        // добавляем в стор
        myRootStore.gameWithYourself.createGameWithYourself(
            cartsArray,
            playersArray,
            trump,
            timeForMove,
            isScam,
            0,
            typeGame
        )

        setSearchParams({isSetting:'false'})
    }

    return (<>
        <div className={cl['creategame']}>
            <div className={cl['creategame__settings']} ref={settingsRef}>
                <Setting title='Количество карт:'><InputNumber
                    max={52}
                    min={36}
                    startNumber={36}
                    step={4}
                    width={100}
                    heigth={20}
                ></InputNumber></Setting>
                <Setting title='Количество игроков:'><InputNumber
                    max={6}
                    min={2}
                    startNumber={2}
                    step={1}
                    width={100}
                    heigth={20}
                ></InputNumber></Setting>
                <Setting title='Козырь:'><SelectOption
                    options={[
                        {title: 'Рандом', valueName: 'rand'},
                        {title: 'Бубны ♦️', valueName: 'diamonds'},
                        {title: 'Черви ♥️', valueName: 'hearts'},
                        {title: 'Пики ♠️', valueName: 'spades'},
                        {title: 'Трефы ♣️', valueName: 'clubs'},
                    ]}
                /></Setting>
                <Setting title='Время на ход:'><SelectOption
                    options={[
                        {title: '10 минут', valueName: '10m'},
                        {title: '5 минут', valueName: '5m'},
                        {title: '3 минуты', valueName: '3m'},
                        {title: '1 минута', valueName: '1m'},
                        {title: '30 секунд', valueName: '30s'},
                        {title: '15 секунд', valueName: '15s'},
                        {title: '10 секунд', valueName: '10s'},
                    ]}
                /></Setting>
                <Setting title='Тип:'><SelectOption
                    options={[
                        {title: 'Переводной', valueName: 'translating'},
                        {title: 'Обычный', valueName: 'standart'},
                    ]}
                /></Setting>
                <Setting title='Жульничевство:'><SelectOption
                    options={[
                        {title: 'Есть', valueName: 'true'},
                        {title: 'Нету', valueName: 'false'},
                    ]}
                /></Setting>
            </div>
            <div>
                <ButtonPlay onClick={handleStart}>
                    Запустить
                </ButtonPlay>
            </div>
        </div>
    </>)
}