import React, {FC} from 'react'
import clsx from 'clsx'
import CreateButton from '../../../app/components/buttons/Create';
import {Actions} from '../../../app/helpers/variables';

type Props = {
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

type CardAction = {
    type: Actions,
    url: string
}

const KTCardHeader: FC<Props> = ({
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

    return (
        <div
            id={id}
            className={clsx(`card-header bg-${bg || 'white'}`, className && className)}
            {...opts}
        >
            <div className='card-title d-flex align-items'>
                {
                    icon !== undefined ? <span className="me-2"><i
                            className={clsx(icon, icon_style !== undefined ? icon_style : '')}></i></span>
                        : ''
                }

                <h3 className={`card-label text-${text_color || 'black'}`}>{text}</h3>
            </div>

            {
                (actions && actions.length > 0) ? <div className="card-toolbar">
                    {
                        actions.map((cardAction, index) => {
                            if(cardAction.type === Actions.CREATE) {
                                return (
                                    <CreateButton url={cardAction.url} key={index}/>
                                );
                            } else {
                                return <></>;
                            }
                        })
                    }
                </div> : <></>
            }

        </div>
    )
}

export {KTCardHeader}
