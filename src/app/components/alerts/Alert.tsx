import React, {Dispatch, SetStateAction} from 'react'
import {KTSVG} from '../../../_metronic/helpers'

type Props = {
  title: string
  messages: string[]
  setMessages: Dispatch<SetStateAction<string[]>>
  color?: string
}

const Alert: React.FC<Props> = ({title, messages, setMessages, color = 'warning'}) => {
  const onClose = () => {
    setMessages([])
  }

  return (
    <div className={`alert alert-${color} d-flex align-items-center p-5 mb-10`}>
      <KTSVG
        path='/media/icons/duotune/general/gen007.svg'
        className={`svg-icon-1 svg-icon-3x me-3 svg-icon-${color}`}
      />

      <div className='d-flex flex-column'>
        <h5 className='fw-semibold mb-1'>{title}</h5>
        <span className='text-warning-emphasis'>
          {messages.length > 0 && (
            <ul className='m-0'>
              {messages.map((message, index) => {
                return <li key={`alert-message-${index}`}>{message}</li>
              })}
            </ul>
          )}
        </span>
      </div>

      <button
        type='button'
        className='position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto'
        onClick={onClose}
      >
        <KTSVG path='/media/icons/duotune/abstract/abs012.svg' className={`svg-icon svg-icon-2x`} />
      </button>
    </div>
  )
}

export default Alert
