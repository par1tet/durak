import cl from './ButtonPlay.module.css'

type ButtonProps = {
    children: any,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => undefined | void
}

export const ButtonPlay = ({children, onClick}: ButtonProps) => {
    return (<button onClick={onClick} className={cl.button}>
        <span>{children}</span>
    </button>)
}