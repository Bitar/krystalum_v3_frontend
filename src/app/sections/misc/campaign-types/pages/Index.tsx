import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {EXPORT_ENDPOINT, getCampaignTypes} from '../../../../requests/misc/CampaignType';
import CampaignTypeIndexFilter from '../partials/IndexFilter';
import {CampaignTypesColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';

const CampaignTypeIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_CAMPAIGN_TYPES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.CAMPAIGN_TYPES_LIST}
                   requestFunction={getCampaignTypes}
                   columnsArray={CampaignTypesColumns}
                   cardHeader={
                       {
                           text: 'All Campaign Types',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('campaign-types-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/campaign-types', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={CampaignTypeIndexFilter}
        />
    )
}

export default CampaignTypeIndex;
