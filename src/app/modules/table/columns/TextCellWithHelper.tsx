import {FC} from 'react'

type Props = {
    text: string,
    helperText: string,
    fontSize?: string
}

const TextCellWithHelper: FC<Props> = ({text, helperText, fontSize}) => (
    <>
        <span className="text-gray-800 fw-semibold mb-1" style={{fontSize: fontSize ? fontSize : '13px', maxWidth: '250px'}}>{text}</span>
        <span className="text-muted fw-semibold d-block" style={{fontSize: fontSize ? fontSize : '11px', maxWidth: '250px'}}>{helperText}</span>
    </>
)

export {TextCellWithHelper}
