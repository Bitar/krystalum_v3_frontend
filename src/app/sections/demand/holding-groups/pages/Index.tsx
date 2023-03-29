import React, {useEffect, useMemo, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../../../modules/table/QueryResponseProvider';
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers';
import {ListViewProvider} from '../../../../modules/table/ListViewProvider';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import KrysTable from '../../../../components/tables/KrysTable';
import {HoldingGroupsColumns} from '../core/TableColumns';
import HoldingGroupFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";
import {EXPORT_ENDPOINT, getHoldingGroups} from '../../../../requests/demand/HoldingGroup';


const HoldingGroupIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_HOLDING_GROUPS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [exportQuery, setExportQuery] = useState<string>('');

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.HOLDING_GROUPS_LIST} requestFunction={getHoldingGroups}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Holding Groups'
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('holding-groups-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/demand/holding-groups', 'manage-demand')]}/>

                        <KTCardBody>
                            <HoldingGroupFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <HoldingGroupTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const HoldingGroupTable = () => {
    const holdingGroups = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => holdingGroups, [holdingGroups]);
    const columns = useMemo(() => HoldingGroupsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={holdingGroups.length > 0 ? holdingGroups[0] : null}
                   isLoading={isLoading}/>
    )
}

export default HoldingGroupIndex;