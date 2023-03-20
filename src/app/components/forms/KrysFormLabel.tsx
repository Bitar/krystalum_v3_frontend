import React from 'react'
import {FormLabel} from 'react-bootstrap';
import clsx from 'clsx';

type Props = {
    text: string,
    isRequired?: boolean
}

const KrysFormLabel: React.FC<Props> = ({text, isRequired = false}) => {
    return (
        <div>
            <FormLabel className={clsx("fs-6 fw-semibold form-label mt-3", {'required': isRequired})}>{text}</FormLabel>
        </div>
    );
}

export default KrysFormLabel;