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

type Props = {
    queryId: string,
    requestFunction: (id: number, query?: string) => Promise<any>,
    requestId: string | number,
    columnsArray: readonly Column<any>[],
    slug: string
}

type TableProps = {
    columnsArray: readonly Column<any>[]
}

const KrysInnerTable: React.FC<Props> = ({
                                             queryId,
                                             requestFunction,
                                             requestId,
                                             columnsArray,
                                             slug
                                         }) => {

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={queryId}
                                   requestFunction={requestFunction} requestId={requestId}>
                <ListViewProvider>
                    <KrysTableSearchFilter slug={slug} />
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
    const columns = useMemo(() => columnsArray, []);

    return (
        <KrysBorderlessTable data={data} columns={columns} model={modelData.length > 0 ? modelData[0] : null}
                             isLoading={isLoading}/>
    )
}

export default KrysInnerTable;