import React from 'react'

interface Props {
    name: string,
    onChangeHandler: (e: any) => void,
    defaultValue: boolean,
    bgColor?: string
}

const KrysCheckbox: React.FC<Props> = ({name, onChangeHandler, defaultValue, bgColor = 'success'}) => {
    return (
        <div className={`form-check form-check-${bgColor} form-switch form-check-custom form-check-solid`}>
            <input className="form-check-input h-20px w-30px" type="checkbox" name={name} onChange={onChangeHandler} checked={defaultValue}/>
        </div>
    );
}

export default KrysCheckbox;