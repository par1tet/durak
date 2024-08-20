import { useSearchParams } from "react-router-dom";
import { Setting } from "./components/Setting.tsx";
import cl from './GameWithUSelf.module.css';
import { InputNumber } from "../../components/UI/input/InputNumber/InputNumber.tsx";
import { SelectOption } from "../../components/UI/select/SelectOption/SelectOption.tsx";

export const GameWithUSelf = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    if(searchParams.get('isSetting') === 'true'){
        return (<>
            <div className={cl['creategame']}>
                <Setting title='Колечество карт:'><InputNumber
                    max={52}
                    min={36}
                    startNumber={36}
                    step={4}
                    width={100}
                    heigth={20}
                ></InputNumber></Setting>
                <Setting title='Колечество игроков:'><InputNumber
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
            </div>
        </>)
    }else if((searchParams.get('isSetting') === 'false')){
        return (<>
            игра
        </>)
    }else{
        return (<>
            Неверный запрос
        </>)
    }

}