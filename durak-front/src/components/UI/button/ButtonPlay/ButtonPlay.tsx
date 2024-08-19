import cl from './ButtonPlay.module.css'

type ButtonProps = {
    children: any,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const ButtonPlay = ({children, onClick}: ButtonProps) => {
    return (<button onClick={onClick}>
        {children}
    </button>)
}