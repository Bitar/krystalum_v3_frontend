import React from 'react'

interface Props {
    name: string;
    label: string;
    onChangeHandler: (e: any) => void;
    defaultValue: boolean;
    bgColor?: string;
}

const KrysRadioButton: React.FC<Props> = ({name, label, onChangeHandler, defaultValue, bgColor = 'success'}) => {
    return (
        <div className={`form-check form-check-custom form-check-solid form-check-${bgColor} d-inline-block me-10`}>
            <input className="form-check-input" type="radio" name={name} onChange={onChangeHandler}
                   checked={defaultValue}/>

            <label className="form-check-label">
                {label}
            </label>
        </div>
    );
}

export default KrysRadioButton;