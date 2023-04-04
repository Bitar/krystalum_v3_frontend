import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {EXPORT_ENDPOINT, getAgencies} from '../../../../requests/demand/Agency'
import {AgenciesColumns} from '../core/TableColumn'
import {PageTypes} from '../../../../helpers/variables';
import AgencyIndexFilter from '../partials/IndexFilter';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {Sections} from "../../../../helpers/sections";
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';

const AgencyIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_AGENCIES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.AGENCIES_LIST}
                   requestFunction={getAgencies}
                   columnsArray={AgenciesColumns}
                   cardHeader={
                       {
                           text: 'All Agencies',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('agencies-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/demand/agencies', 'manage-demand')
                           ],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={AgencyIndexFilter}
        />
    )
}

export default AgencyIndex;
