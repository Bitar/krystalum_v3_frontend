import React, {FC} from 'react'

type Props = {
  status: string
  color: string

  align?: 'left' | 'center' | 'right'
}

const BadgeCell: FC<React.PropsWithChildren<Props>> = ({status, color, align}) => {
  let alignClass = 'align-items-center justify-content-around'

  if (align === 'left') {
    alignClass = 'align-items-start'
  } else if (align === 'right') {
    alignClass = 'align-items-end'
  }

  return (
    <div className={`d-flex ${alignClass}`}>
      <div className='d-flex flex-column'>
        <span className={'badge badge-' + color}>{status}</span>
      </div>
    </div>
  )
}

export {BadgeCell}
