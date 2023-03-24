import React, {useEffect} from 'react';
import {useQueryResponse} from '../../modules/table/QueryResponseProvider';

interface Props {
    doRefetch: boolean;
}

const TableRefetch: React.FC<Props> = ({doRefetch}) => {
    const {refetch} = useQueryResponse();

    useEffect(() => {
        if (doRefetch) {
            refetch();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doRefetch]);

    return <></>;
};

export default TableRefetch;
