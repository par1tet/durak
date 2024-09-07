import cl from './SelectOption.module.css'

type propsSelect = {
    options: {
        title: string,
        valueName: string,
    }[]
}

export const SelectOption = ({options}: propsSelect) => {
    return (<select className={cl.select}>
        {options.map(option =>
            <option value={option.valueName} key={option.valueName}>
                {option.title}
            </option>
        )}
    </select>)
}