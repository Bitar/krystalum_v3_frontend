import React, {useMemo} from 'react';
import {Column} from 'react-table';

import KrysBorderlessTable from './KrysBorderlessTable';
import {QueryRequestProvider} from '../../modules/table/QueryRequestProvider';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../modules/table/QueryResponseProvider';
import {ListViewProvider} from '../../modules/table/ListViewProvider';
import KrysTableSearchFilter from './KrysTableSearchFilter';
import TableRefetch from './TableRefetch';

type Props = {
    queryId: string,
    requestFunction: (id: number, query?: string) => Promise<any>,
    requestId: string | number,
    requestQuery?: string,
    columnsArray: readonly Column<any>[],
    slug: string,
    doRefetch: boolean,
    addedRecord?: any
}

type TableProps = {
    columnsArray: readonly Column<any>[],
    addedRecord?: any
}

const KrysInnerTable: React.FC<Props> = ({
                                             queryId,
                                             requestFunction,
                                             requestId,
                                             requestQuery,
                                             columnsArray,
                                             slug,
                                             doRefetch,
                                             addedRecord
                                         }) => {
    console.log(doRefetch)
    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={queryId}
                                   requestFunction={requestFunction} requestId={requestId} requestQuery={requestQuery}>
                <TableRefetch doRefetch={doRefetch}/>

                <ListViewProvider>
                    <KrysTableSearchFilter slug={slug}/>
                    <InnerTable columnsArray={columnsArray} addedRecord={addedRecord}/>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const InnerTable = ({columnsArray, addedRecord}: TableProps) => {
    const modelData = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => modelData, [modelData]);
    const columns = useMemo(() => columnsArray,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    if (addedRecord) {
        data.find((datum) => datum.is_active = 0)
        data.unshift(addedRecord)
    }

    return (
        <KrysBorderlessTable data={data} columns={columns} model={modelData.length > 0 ? modelData[0] : null}
                             isLoading={isLoading}/>
    )
}

export default KrysInnerTable;