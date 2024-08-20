// import cl from './MainPage.module.css'
import { Buttons } from '../components/Buttons.tsx'
import { useNavigate } from 'react-router-dom'

export const MainPage = ({}) => {
    const navigate = useNavigate()

    return (
        <>
            <Buttons buttons={[
                {
                    title:'Присоединиться к игре',
                    onClick: (e) => console.log('еще нет')
                },
                {
                    title:'Создать игру',
                    onClick: (e) => console.log('еще нет')
                },
                {
                    title:'Игра с ботами',
                    onClick: (e) => console.log('еще нет')
                },
                {
                    title:'Игра с самим собой',
                    onClick: (e) => {
                        navigate('/gamewithuself')
                    }
                },
            ]}
            left={200}
            top={(window.innerHeight / 2)-250}
            ></Buttons>
        </>
    )
}