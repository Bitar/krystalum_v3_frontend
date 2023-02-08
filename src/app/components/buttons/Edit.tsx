import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

type Props = {
    url?: string
}

const EditButton: React.FC<Props> = ({url}) => {
    return (
        <Link to={(url ? url : '') + '/edit'} className='btn btn-light-warning fs-6' title='Edit'>
            <i className={clsx('fa fs-2', 'fa-pencil', 'pe-0')}></i>
        </Link>
    );
}

export default EditButton;