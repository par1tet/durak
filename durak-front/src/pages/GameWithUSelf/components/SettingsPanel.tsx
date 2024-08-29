import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ButtonPlay } from "../../../components/UI/button/ButtonPlay/ButtonPlay.tsx";
import { InputNumber } from "../../../components/UI/input/InputNumber/InputNumber.tsx";
import { SelectOption } from "../../../components/UI/select/SelectOption/SelectOption.tsx";
import { useStore } from "../../../hooks/useStore.ts";
import { rootStore } from "../../../store/rootStore.ts";
import { Cart } from "../../../utils/abstractClasses/cart.ts";
import { Suit } from "../../../utils/enums/suit.ts";
import { createCartsArray } from "../../../utils/functions/createCartsArray.ts";
import { createPlayersArray } from "../../../utils/functions/createPlayersArray.ts";
import { shuffle } from "../../../utils/functions/shuffle.ts";
import cl from './../GameWithUSelf.module.css';
import { Setting } from "./Setting.tsx";

export const SettingsPanel = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const myRootStore: rootStore = useStore()
    const settingsRef = useRef<HTMLDivElement>(null)

    function handleStart(): undefined {
        if (!settingsRef.current) return undefined;// проверка что ref не null

        const countPlayers: number = +((settingsRef.current.children[1].children[1] as HTMLInputElement).value)

        // получаем козырь
        let trump: Suit = Suit['rand']
        switch((settingsRef.current.children[2].children[1] as HTMLInputElement).value){
            case 'diamonds':
                trump = Suit['diamonds']
                break;
            case 'hearts':
                trump = Suit['hearts']
                break;
            case 'spades':
                trump = Suit['spades']
                break;
            case 'clubs':
                trump = Suit['clubs']
                break;
            case 'rand':
                switch (Math.floor(Math.random() * 4)){
                    case 0:
                        trump = Suit['clubs']
                        break
                    case 1:
                        trump = Suit['diamonds']
                        break
                    case 2:
                        trump = Suit['spades']
                        break
                    case 3:
                        trump = Suit['hearts']
                        break
                }
                break;
        }

        // создаем массив карт
        let cartsArray: Cart[] = createCartsArray(+((settingsRef.current.children[0].children[1] as HTMLInputElement).value))
        shuffle(cartsArray)

        // получаем козырную карту
        let trumpCart: Cart | null = null

        if (cartsArray.length / countPlayers !== countPlayers){
            trumpCart = cartsArray.filter(cart => cart.suit === trump)[0]

            // удаляем козырную карту из колоды
            cartsArray = cartsArray.filter(cart => cart !== trumpCart)
        }

        // создаем массив игроков
        const playersArray = createPlayersArray(
            countPlayers,
            cartsArray,
            trump
        )

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
        myRootStore.gameWithYourself.createGame(
            cartsArray,
            playersArray,
            trump,
            timeForMove,
            isScam,
            0,
            typeGame,
            trumpCart
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
                <Setting title='Тип:'><SelectOption
                    options={[
                        {title: 'Переводной', valueName: 'translating'},
                        {title: 'Обычный', valueName: 'standart'},
                    ]}
                /></Setting>
                {/* <Setting title='Время на ход:'><SelectOption
                    options={[
                        {title: '1 минута', valueName: '1m'},
                        {title: '30 секунд', valueName: '30s'},
                        {title: '10 секунд', valueName: '10s'},
                    ]}
                /></Setting>
                <Setting title='Жульничевство:'><SelectOption
                    options={[
                        {title: 'Есть', valueName: 'true'},
                        {title: 'Нету', valueName: 'false'},
                    ]}
                /></Setting> */}
            </div>
            <div>
                <ButtonPlay onClick={handleStart}>
                    Запустить
                </ButtonPlay>
            </div>
        </div>
    </>)
}