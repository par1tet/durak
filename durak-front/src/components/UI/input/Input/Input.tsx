import cl from './Input.module.css'
import { forwardRef } from 'react'

type propsInput = {
    width?: number,
    height?: number,
    value?: string,
    center?: boolean,
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void
    placeholder?: string
}

export const Input = forwardRef(({width = 100, height = 220, value, center=false, onChange, placeholder}: propsInput, ref?:React.ForwardedRef<HTMLInputElement>) => {
    return (<input
        ref={ref}
        value={value}
        onChange={onChange}
        style={{width: width, height: height}}
        className={`${cl['input']} ${center ? cl['inputcenter'] : null}`}
        placeholder={placeholder}
    >
    </input>)
})