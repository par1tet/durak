import cl from './Input.module.css'
import { ForwardedRef, forwardRef, useEffect } from 'react'

type propsInput = {
    width?: number,
    height?: number,
    value?: string,
    center?: boolean
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void
}

export const Input = forwardRef(({width = 100, height = 220, value, center=false, onChange}: propsInput, ref?:React.ForwardedRef<HTMLInputElement>) => {
    return (<input
        ref={ref}
        value={value}
        onChange={onChange}
        style={{width: width, height: height}}
        className={`${cl['input']} ${center ? cl['inputcenter'] : null}`}
    >
    </input>)
})