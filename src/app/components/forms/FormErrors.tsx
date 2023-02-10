import React from 'react'
import {Alert} from 'react-bootstrap';

interface Props {
    errorMessages: string[];
}

const FormErrors: React.FC<Props> = ({errorMessages}) => {
    return (
        errorMessages.length > 0 ?
            <Alert variant="danger">
                <ul className="mb-0">
                    {errorMessages.map((errorMessage, index) => {
                        return (
                            <li key={index}>{errorMessage}</li>
                        );
                    })}
                </ul>
            </Alert> : <></>
    );
}

export default FormErrors;