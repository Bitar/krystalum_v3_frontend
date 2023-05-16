import React from 'react'

interface Props {
    name: string,
    label: string,
    onChangeHandler: (e: any) => void,
    defaultValue: boolean,
    bgColor?: string,
    disabled?: boolean
}

const KrysRadioButton: React.FC<Props> = ({name, label, onChangeHandler, defaultValue, bgColor = 'success', disabled = false}) => {
    return (
        <div className={`form-check form-check-custom form-check-solid form-check-${bgColor} d-inline-block me-10`}>
            <input className="form-check-input" type="radio" name={name} onChange={onChangeHandler}
                   checked={defaultValue} disabled={disabled}/>

            <label className="form-check-label">
                {label}
            </label>
        </div>
    );
}

export default KrysRadioButton;