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
    columnsArray: readonly Column<any>[],
    slug: string,
    doRefetch: boolean,
    showSearchFilter?: boolean
}

type TableProps = {
    columnsArray: readonly Column<any>[]
}

const KrysInnerTable: React.FC<Props> = ({
                                             queryId,
                                             requestFunction,
                                             requestId,
                                             columnsArray,
                                             slug,
                                             doRefetch,
                                             showSearchFilter= true
                                         }) => {

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={queryId}
                                   requestFunction={requestFunction} requestId={requestId}>

                <TableRefetch doRefetch={doRefetch}/>

                <ListViewProvider>
                    {
                        showSearchFilter ? <KrysTableSearchFilter slug={slug}/> : <></>
                    }

                    <InnerTable columnsArray={columnsArray}/>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const InnerTable = ({columnsArray}: TableProps) => {
    const modelData = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => modelData, [modelData]);
    const columns = useMemo(() => columnsArray,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    return (
        <KrysBorderlessTable data={data} columns={columns} model={modelData.length > 0 ? modelData[0] : null}
                             isLoading={isLoading}/>
    )
}

export default KrysInnerTable;