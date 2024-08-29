import cl from './../GameWithBots.module.css';

type propsSetting = {
    children: React.ReactNode,
    title: string
}

export const Setting = ({children, title}: propsSetting) => {
    return (<div className={cl['creategame-setting']}>
        <span>
            {title}
        </span>
        {children}
    </div>)
}