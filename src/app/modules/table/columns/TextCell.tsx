import {FC} from 'react'

type Props = {
    text: string
}

const TextCell: FC<Props> = ({text}) => (
    <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
            <span className='text-gray-800 pe-none mb-1 text-wrap'
                  style={{fontSize: '13px', maxWidth: '250px'}}>{text}</span>
        </div>
    </div>
)

export {TextCell}
