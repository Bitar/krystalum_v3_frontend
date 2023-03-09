import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

type Props = {
    url: string,
    className?: string
}

const CreateButton: React.FC<Props> = ({url, className}) => {
    return (
        <Link to={`${url}/create`} className={clsx('btn btn-light-success fs-6', className && className)} title='Create'>
            <i className={clsx('fa fs-4', 'fa-plus', 'pe-0')}></i>
        </Link>
    );
}

export default CreateButton;