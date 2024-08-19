import cl from './MainPage.module.css'
import { Buttons } from '../components/Buttons.tsx'

export const MainPage = ({}) => {
    return (
        <main className={cl.mainpage}>
            <Buttons buttons={[
                {
                    title:'test',
                    onClick: (e) => {console.log(e.target)}
                }
            ]}
            ></Buttons>
        </main>
    )
}