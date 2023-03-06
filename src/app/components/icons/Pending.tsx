import React from 'react';
import clsx from 'clsx';

type Props = {
    className?: string
}

const PendingIcon: React.FC<Props> = ({ className}) => {
    return (
        <i className={clsx('fa-duotone fs-3 text-krys', 'fa-hourglass-clock')}></i>
    );
}

export default PendingIcon;