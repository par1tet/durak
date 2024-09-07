import cl from './ButtonAction.module.css'
import { forwardRef } from 'react'

type propsButton = {
    title:string,
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    dataPlayerindex: number
}

export const ButtonAction = forwardRef(({title, className, onClick, dataPlayerindex}:propsButton, ref:React.ForwardedRef<HTMLButtonElement>) => {
    return (<button
        className={`${cl['button']} ${className}`}
        ref={ref}
        onClick={onClick}
        data-playerindex={dataPlayerindex}
    >
        {title}
    </button>)
})