import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

type Props = {
    url?: string,
    className?: string
}

const EditButton: React.FC<Props> = ({url, className}) => {
    return (
        <Link to={(url ? url : '') + '/edit'} className={clsx('btn btn-light-warning fs-6', className && className)} title='Edit'>
            <i className={clsx('fa fs-4', 'fa-pencil', 'pe-0')}></i>
        </Link>
    );
}

export default EditButton;