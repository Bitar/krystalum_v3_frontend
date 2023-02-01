import React, {FC} from 'react'
import clsx from 'clsx'

type Props = {
    className?: string
    text: string
    id?: string
    bg?: string
    text_color?: string
    collapse?: boolean
    target_id?: string
}

const KTCardHeader: FC<Props> = ({
                                     className,
                                     text,
                                     id,
                                     bg,
                                     text_color,
                                     collapse = false,
                                     target_id,
                                 }) => {
    let opts: any = {}
    if (collapse) {
        opts['role'] = 'button'
        opts['data-bs-toggle'] = 'collapse'
        opts['data-bs-target'] = `#${target_id}`
        opts['aria-expanded'] = 'true'
        opts['aria-controls'] = `${target_id}`
    }

    return (
        <div
            id={id}
            className={clsx(`card-header bg-${bg || 'white'}`, className && className)}
            {...opts}
        >
            <div className='card-title'>
                <h3 className={`card-label text-${text_color || 'black'}`}>{text}</h3>
            </div>
        </div>
    )
}

export {KTCardHeader}
