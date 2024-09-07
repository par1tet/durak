import { useState } from 'react'
import cl from './InputNumber.module.css'

type propsInput = {
    max?: number,
    min?: number,
    startNumber?: number,
    step?: number,
    width?: number,
    heigth?: number
}

export const InputNumber = ({max, min, startNumber, step, width, heigth}:propsInput) => {
    const [value, setValue] = useState(startNumber)

    function handleChange(e: React.FormEvent<HTMLInputElement>){
        if (max === undefined || min === undefined || step === undefined) {
            setValue(+e.currentTarget.value)
            return 0;
        }

        if(!(+e.currentTarget.value % step === 0) || +e.currentTarget.value < min || +e.currentTarget.value > max){
            return 0
        }
        setValue(+e.currentTarget.value)
    }

    return (<input
        className={cl.inputnumber}
        type="number"
        max={max}
        min={min}
        value={value}
        step={step}
        onChange={handleChange}
        style={{
            width:width,
            height:heigth
        }}
    />)
}