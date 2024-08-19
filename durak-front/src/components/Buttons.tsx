import { forwardRef, RefObject, useEffect, useRef } from 'react'
import cl from './Buttons.module.css'
import { ButtonPlay } from './UI/button/ButtonPlay/ButtonPlay.tsx'

type ButtonsProps = {
    buttons: {
        title: string,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => undefined | void
    }[]
    left?: number,
    top?: number,
}

export const Buttons = ({buttons, left, top}: ButtonsProps) => {
    const buttonsRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (buttonsRef.current === null) return undefined
        buttonsRef.current.style.left = `${(left as number)}px`
        buttonsRef.current.style.top = `${(top as number)}px`
    }, [])

    return (<div
        className={cl.buttons}
        ref={buttonsRef}
    >
        {buttons.map((button, id) =>
            <ButtonPlay onClick={button.onClick} key={`${button.title}:${id}`}>
                {button.title}
            </ButtonPlay>
        )}
    </div>)
}