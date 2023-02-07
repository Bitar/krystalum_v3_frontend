import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

type Props = {
    url?: string
}

const CreateButton: React.FC<Props> = ({url}) => {
    return (
        <Link to={(url ? url : '') + '/create'} className='btn btn-light-success fs-6' title='Create'>
            <i className={clsx('fa fs-2', 'fa-plus', 'pe-0')}></i>
        </Link>
    );
}

export default CreateButton;