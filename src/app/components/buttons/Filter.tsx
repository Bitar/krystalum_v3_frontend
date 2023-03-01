import React from 'react';
import clsx from 'clsx';
import {Button} from 'react-bootstrap';

type Props = {
    target?: string,
    showFilter?: boolean,
    setShowFilter?: React.Dispatch<React.SetStateAction<boolean>>,
    className?: string
}

const FilterButton: React.FC<Props> = ({target, showFilter, setShowFilter, className}) => {
    return (
        <Button className={clsx('btn btn-light-primary fs-6', className)} title='Filter' onClick={() => setShowFilter && setShowFilter(!showFilter)} aria-controls={target}
                aria-expanded={showFilter}>
            {
                showFilter ? <i className={clsx('fa fs-4', 'fa-solid fa-filter-slash', 'pe-0')}></i> : <i className={clsx('fa fs-4', 'fa-solid fa-filter', 'pe-0')}></i>
            }
        </Button>
    );
}

export default FilterButton;