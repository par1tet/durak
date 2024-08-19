import cl from './Buttons.module.css'
import { ButtonPlay } from './UI/button/ButtonPlay/ButtonPlay.tsx'

type ButtonsProps = {
    buttons: {
        title: string,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => undefined | void
    }[]
}

export const Buttons = ({buttons}: ButtonsProps) => {
    return (<div className={cl.buttons}>
        {buttons.map((button, id) =>
            <ButtonPlay onClick={button.onClick} key={`${button.title}:${id}`}>
                {button.title}
            </ButtonPlay>
        )}
    </div>)
}