import React from 'react'

import {Actions} from '../../helpers/variables';

interface Props {
    type?: string | null,
    model?: string,
    message?: string
}

const FormSuccess: React.FC<Props> = ({type, model, message}) => {
    let defaultMessage: string | undefined = undefined;

    if(message !== undefined) {
        defaultMessage = message;
    } else {
        if (type !== null && type !== undefined && parseInt(type) === Actions.CREATE) {
            defaultMessage = `The ${model} was created.`
        } else if (type !== null && type !== undefined && parseInt(type) === Actions.EDIT) {
            defaultMessage = `The ${model} was updated.`
        }
    }

    return (
        defaultMessage !== undefined ?
            <div className="alert alert-success d-flex align-items-center p-5">
                <i className="fa-solid fa-check text-success me-4 fs-1" />
                <div className="d-flex flex-column">
                    <h4 className="mb-1 text-success">Success</h4>
                    <span>{defaultMessage}</span>
                </div>
            </div> : <></>
    );
}

export default FormSuccess;