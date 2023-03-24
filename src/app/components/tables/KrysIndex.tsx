import React, {useMemo} from 'react';
import {Column} from 'react-table';

import {KTCard, KTCardBody} from '../../../_metronic/helpers';

import {QueryRequestProvider} from '../../modules/table/QueryRequestProvider';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../modules/table/QueryResponseProvider';
import {ListViewProvider} from '../../modules/table/ListViewProvider';
import {KTCardHeader, KTCardHeaderProps} from '../../../_metronic/helpers/components/KTCardHeader';
import KrysTable from './KrysTable';

type Props = {
    queryId: string,
    requestFunction: (query?: string) => Promise<any>,
    columnsArray: readonly Column<any>[],
    cardHeader: KTCardHeaderProps,
    showFilter: boolean,
    setExportQuery: React.Dispatch<React.SetStateAction<string>>,
    FilterComponent: React.FC<{showFilter: boolean, setExportQuery: React.Dispatch<React.SetStateAction<string>>}>
}

type TableProps = {
    columnsArray: readonly Column<any>[]
}

const KrysIndex: React.FC<Props> = ({
                                        queryId,
                                        requestFunction,
                                        columnsArray,
                                        cardHeader,
                                        showFilter,
                                        setExportQuery,
                                        FilterComponent
                                    }) => {

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={queryId} requestFunction={requestFunction}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text={cardHeader.text}
                                      icon={cardHeader.icon}
                                      icon_style={cardHeader.icon_style}
                                      actions={cardHeader.actions}/>

                        <KTCardBody>
                            <FilterComponent showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <KrysIndexTable columnsArray={columnsArray}/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const KrysIndexTable = ({columnsArray}: TableProps) => {
    const modelData = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => modelData, [modelData]);
    const columns = useMemo(() => columnsArray, []);

    return (
        <KrysTable data={data} columns={columns} model={modelData.length > 0 ? modelData[0] : null}
                   isLoading={isLoading}/>
    )
}

export default KrysIndex;