import cl from './MainPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Buttons } from '../../components/Buttons.tsx'
import { InputTitle } from '../../components/UI/input/InputTitle/InputTitle.tsx'

export const MainPage = ({}) => {
    const navigate = useNavigate()
    if(!(localStorage.getItem('nickname'))){
        localStorage.setItem('nickname', 'Эчпочмак')
    }

    return (
        <div className={cl['actionslist']}>
            <InputTitle title='Ник' width={208} onChange={e => {
                localStorage.setItem('nickname', e.currentTarget.value)
            }} startValue={localStorage.getItem('nickname') ?? 'Эчпочмак'}></InputTitle>
            <Buttons buttons={[
                {
                    title:'Присоединиться к игре',
                    onClick: () => {
                        navigate('/joingame')
                    }
                },
                {
                    title:'Создать игру',
                    onClick: () => {
                        navigate('/onlinegame?isSetting=true')
                    }
                },
                {
                    title:'Игра с ботами',
                    onClick: () => {
                        navigate('/gamewithbots?isSetting=true')
                    }
                },
                {
                    title:'Игра с самим собой',
                    onClick: () => {
                        navigate('/gamewithuself?isSetting=true')
                    }
                },
            ]}
            top={(window.innerHeight / 2)-250}
            ></Buttons>
        </div>
    )
}