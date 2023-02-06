import React from 'react';
import clsx from 'clsx';

type Props = {
    url?: string
}

const CreateButton: React.FC<Props> = ({url}) => {
    return (
        <a href={(url ? url : '') + '/create'} className='btn btn-icon btn-success text-hover-success fs-6' data-bs-toggle='tooltip'
           data-bs-trigger='hover'
           data-bs-dismiss-='click'
           title='Create'>
            <i className={clsx('fa fs-2', 'fa-plus')}></i>
        </a>
    );
}

export default CreateButton;