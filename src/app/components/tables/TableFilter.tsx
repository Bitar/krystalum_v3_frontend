import React, {useEffect} from 'react';
import {useQueryRequest} from '../../modules/table/QueryRequestProvider';
import {initialQueryState} from '../../../_metronic/helpers';

interface Props {
    filters: any;
}

const TableFilter: React.FC<Props> = ({filters}) => {
    const {updateState} = useQueryRequest();

    useEffect(() => {
        if (filters) {
            updateState({
                filter: filters,
                ...initialQueryState,
            });

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    return <></>;
};

export default TableFilter;
