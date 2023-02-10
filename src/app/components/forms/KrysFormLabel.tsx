import React from 'react'
import {FormLabel} from 'react-bootstrap';

import FormFieldRequired from './FormFieldRequired';

type Props = {
    text: string,
    isRequired?: boolean
}

const KrysFormLabel: React.FC<Props> = ({text, isRequired = false}) => {
    return (
        <div>
            <FormLabel className="fs-6 fw-semibold form-label mt-3">{text}</FormLabel> { isRequired ? <FormFieldRequired/> : <></> }
        </div>
    );
}

export default KrysFormLabel;