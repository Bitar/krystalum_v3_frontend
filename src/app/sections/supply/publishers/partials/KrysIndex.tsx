import React, {useEffect, useMemo} from 'react';
import {Column} from 'react-table';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';

import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {PageTypes} from '../../../../helpers/variables';
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../../../modules/table/QueryResponseProvider';
import {ListViewProvider} from '../../../../modules/table/ListViewProvider';
import KrysBorderlessTable from '../../../../components/tables/KrysBorderlessTable';
import {KTCardHeader, KTCardHeaderProps} from '../../../../../_metronic/helpers/components/KTCardHeader';
import PublisherIndexFilter from './IndexFilter';
import KrysTable from '../../../../components/tables/KrysTable';

type TableComponentName = "default" | "borderless";

const tableComponents: Record<TableComponentName, React.ComponentType<any>> = {
    "default": KrysTable,
    "borderless": KrysBorderlessTable
};

type Props = {
    queryId: string,
    requestFunction: (query?: string) => Promise<any>,
    columnsArray: readonly Column<any>[],
    cardHeader?: KTCardHeaderProps,
    showFilter?: boolean,
    setExportQuery?: React.Dispatch<React.SetStateAction<string>>,
    table: TableComponentName,
    cardBodyClassNames?: string
}

type TableProps = {
    columnsArray: readonly Column<any>[],
    table: TableComponentName
}

const KrysIndex: React.FC<Props> = ({queryId, requestFunction, columnsArray, cardHeader, showFilter, setExportQuery, table, cardBodyClassNames}) => {

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={queryId} requestFunction={requestFunction}>
                <ListViewProvider>
                    <KTCard>
                        {
                            cardHeader &&
                            <KTCardHeader text={cardHeader.text}
                                          icon={cardHeader.icon}
                                          icon_style={cardHeader.icon_style}
                                          actions={cardHeader.actions}/>
                        }

                        <KTCardBody className={cardBodyClassNames}>
                            {
                                showFilter && setExportQuery &&
                                <PublisherIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>
                            }

                            <KrysIndexTable columnsArray={columnsArray} table={table}/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const KrysIndexTable = ({columnsArray, table}: TableProps) => {
    const modelData = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => modelData, [modelData]);
    const columns = useMemo(() => columnsArray, []);

    const TableComponent = tableComponents[table];

    return (
        <TableComponent data={data} columns={columns} model={modelData.length > 0 ? modelData[0] : null}
                   isLoading={isLoading}/>
    )
}

export default KrysIndex;