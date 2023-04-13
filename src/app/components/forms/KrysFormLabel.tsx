import React from 'react'
import {FormLabel} from 'react-bootstrap';
import clsx from 'clsx';

type Props = {
    text: string,
    isRequired?: boolean
}

const KrysFormLabel: React.FC<Props> = ({text, isRequired = false}) => {

    if (text.length > 0) {
        text = text.split(' ').map((entry) => entry.toLowerCase()).join(' ');
        text = text.charAt(0).toUpperCase() + text.slice(1);
    }

    return (
        <div>
            <FormLabel className={clsx("fs-base fw-semibold form-label mt-3", {'required': isRequired})}>{text}</FormLabel>
        </div>
    );
}

export default KrysFormLabel;