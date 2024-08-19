import cl from './Buttons.module.css'
import { ButtonPlay } from './UI/button/ButtonPlay/ButtonPlay.tsx'

type ButtonsProps = {
    buttons: {
        title: string,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    }[]
}

export const Buttons = ({buttons}: ButtonsProps) => {
    return (<div className={cl.buttons}>
        {buttons.map((button) =>
            <ButtonPlay onClick={button.onClick}>
                {button.title}
            </ButtonPlay>
        )}
    </div>)
}