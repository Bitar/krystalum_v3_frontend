import React, {FC} from 'react'
import clsx from 'clsx'

import {
    CardAction,
} from '../../../app/components/misc/CardAction';

export type KTCardHeaderProps = {
    className?: string
    text: string
    id?: string
    bg?: string
    text_color?: string
    collapse?: boolean
    target_id?: string,
    actions?: CardAction[],
    icon?: string,
    icon_style?: string
}

const KTCardHeader: FC<KTCardHeaderProps> = ({
                                                 className,
                                                 text,
                                                 id,
                                                 bg,
                                                 text_color,
                                                 collapse = false,
                                                 target_id,
                                                 actions,
                                                 icon,
                                                 icon_style

                                             }) => {
    let opts: any = {}
    if (collapse) {
        opts['role'] = 'button'
        opts['data-bs-toggle'] = 'collapse'
        opts['data-bs-target'] = `#${target_id}`
        opts['aria-expanded'] = 'true'
        opts['aria-controls'] = `${target_id}`
    }

    if (text.length > 0) {
        text = text.split(' ').map((entry) => entry.toLowerCase()).join(' ');
        text = text.charAt(0).toUpperCase() + text.slice(1);
    }

    return (
        <div
            id={id}
            className={clsx(`card-header`, className && className, bg && `bg-${bg}`)}
            {...opts}
        >
            <div className='card-title d-flex align-items'>
                {
                    icon !== undefined ? <span className="me-2"><i
                            className={clsx(icon, icon_style !== undefined ? icon_style : '')}></i></span>
                        : ''
                }

                <h3 className={`card-label text-${text_color || 'dark'}`}>{text}</h3>
            </div>

            {
                (actions && actions.length > 0) ? <div className="card-toolbar">
                    {
                        actions.map((cardAction, index) => {
                            return cardAction.getHtmlComponent(index);
                        })
                    }
                </div> : <></>
            }

        </div>
    )
}

export {KTCardHeader}