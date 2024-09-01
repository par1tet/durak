// import cl from './MainPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Buttons } from '../../components/Buttons.tsx'
import axios from 'axios'

export const MainPage = ({}) => {
    const navigate = useNavigate()

    return (
        <>
            <Buttons buttons={[
                {
                    title:'Присоединиться к игре',
                    onClick: () => console.log('еще нет')
                },
                {
                    title:'Создать игру',
                    onClick: () => {
                        axios.get('http://localhost:5000/test')
                        .then(r => {
                            console.log(r.data)
                        })
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
            left={200}
            top={(window.innerHeight / 2)-250}
            ></Buttons>
        </>
    )
}