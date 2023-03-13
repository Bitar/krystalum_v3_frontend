import React, {FC} from 'react'
import clsx from 'clsx';

type Props = {
    texts: string[]
    color: string

    align?: 'left' | 'center' | 'right',
    asColumn?: boolean
}

const BadgesCell: FC<React.PropsWithChildren<Props>> = ({texts, color, align, asColumn = false}) => {
    let alignClass = 'align-items-center justify-content-around'

    if (align === 'left') {
        alignClass = 'align-items-start'
    } else if (align === 'right') {
        alignClass = 'align-items-end'
    }

    return (
        <div className={`d-flex ${alignClass}`}>
            <div className={clsx('d-flex', asColumn ? 'flex-column' : '')}>
                {texts.map((text, index) => (
                    <span key={index} className={'badge badge-' + color}>{text}</span>
                ))}
            </div>
        </div>
    )
}

export {BadgesCell}
