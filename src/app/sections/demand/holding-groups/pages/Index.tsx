import React, {useEffect, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QUERIES} from '../../../../../_metronic/helpers';
import {HoldingGroupsColumns} from '../core/TableColumns';
import HoldingGroupFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";
import {EXPORT_ENDPOINT, getHoldingGroups} from '../../../../requests/demand/HoldingGroup';
import KrysIndex from '../../../../components/tables/KrysIndex';


const HoldingGroupIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_HOLDING_GROUPS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [exportQuery, setExportQuery] = useState<string>('');

    return (
        <KrysIndex queryId={QUERIES.HOLDING_GROUPS_LIST}
                   requestFunction={getHoldingGroups}
                   columnsArray={HoldingGroupsColumns}
                   cardHeader={
                       {
                           text: 'All Holding Groups',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('holding-groups-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/demand/holding-groups', 'manage-demand')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={HoldingGroupFilter}
        />
    )
}

export default HoldingGroupIndex;