import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {EXPORT_ENDPOINT, getCampaigns} from '../../../../requests/demand/Campaign'
import {CampaignsColumns} from '../core/TableColumn'
import {PageTypes} from '../../../../helpers/variables';
import CampaignIndexFilter from '../partials/IndexFilter';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {Sections} from "../../../../helpers/sections";
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';

const CampaignIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_CAMPAIGNS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.CAMPAIGNS_LIST}
                   requestFunction={getCampaigns}
                   columnsArray={CampaignsColumns}
                   cardHeader={
                       {
                           text: 'All Campaigns',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('TODO-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/demand/campaigns', 'manage-demand')
                           ],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={CampaignIndexFilter}
        />
    )
}

export default CampaignIndex;
