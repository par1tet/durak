import { useEffect, useRef, useState } from 'react'
import cl from './InputTitle.module.css'
import { forwardRef } from 'react'

type inputTitleProps = {
    title: string,
    width?: number,
    height?: number,
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
    value?: string,
    startValue?: string
}

export const InputTitle = forwardRef(({title, width, height, startValue, onChange}: inputTitleProps, ref?:React.ForwardedRef<HTMLInputElement>) => {
    const [value, setValue] = useState(startValue)

    return (<div className={cl['inputtitle']}
        style={{
            width: width,
            height: height
        }}
    >
        <span>{title}</span>
        <input type="text" value={value} onChange={e => {
            setValue(e.currentTarget.value);
            if(onChange) onChange(e);
        }} ref={ref}/>
    </div>)
})