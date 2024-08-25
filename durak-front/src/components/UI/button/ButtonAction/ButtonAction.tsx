import cl from './ButtonAction.module.css'
import { forwardRef, useRef } from 'react'

type propsButton = {
    title:string,
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const ButtonAction = forwardRef(({title, className, onClick}:propsButton, ref:React.ForwardedRef<HTMLButtonElement>) => {
    return (<button
        className={`${cl['button']} ${className}`}
        ref={ref}
        onClick={onClick}
    >
        {title}
    </button>)
})