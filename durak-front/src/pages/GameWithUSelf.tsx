import { useSearchParams } from "react-router-dom"

export const GameWithUSelf = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    if(searchParams.get('isSetting') === 'true'){
        return (<>
            создание игры
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