import React from 'react';
import clsx from 'clsx';
import {Button} from 'react-bootstrap';

type Props = {
    downloadAction?: () => boolean,
    className?: string
}

const ExportButton: React.FC<Props> = ({downloadAction, className}) => {
    return (
        <Button className={clsx('btn btn-light-info fs-6', className && className)} title='Export' onClick={downloadAction}>
            <i className={clsx('fa fs-4', 'fa-arrow-down-to-line', 'pe-0')}></i>
        </Button>
    );
}

export default ExportButton;