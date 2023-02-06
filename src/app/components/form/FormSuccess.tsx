import React from 'react'
import {Alert} from 'react-bootstrap';
import {Actions} from '../../helpers/variables';

interface Props {
    type: string | null,
    model: string
}

const FormSuccess: React.FC<Props> = ({type, model}) => {
    let message: string | undefined = undefined;

    if (type !== null && parseInt(type) == Actions.CREATE) {
        message = `The ${model} was created.`
    } else if (type !== null && parseInt(type) == Actions.EDIT) {
        message = `The ${model} was updated.`
    }

    return (
        message !== undefined ?
            <div className="alert alert-success d-flex align-items-center p-5">
                <i className="fa-solid fa-check text-success me-4 fs-1" />
                <div className="d-flex flex-column">
                    <h4 className="mb-1 text-success">Success</h4>
                    <span>{message}</span>
                </div>
            </div> : <></>
    );
}

export default FormSuccess;