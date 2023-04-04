import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {EXPORT_ENDPOINT, getAdvertisers} from '../../../../requests/demand/Advertiser'
import {PageTypes} from '../../../../helpers/variables';
import AdvertiserIndexFilter from '../partials/IndexFilter';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {Sections} from "../../../../helpers/sections";
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import {AdvertisersColumns} from '../core/TableColumn';
import KrysIndex from '../../../../components/tables/KrysIndex';

const AdvertiserIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_ADVERTISERS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.ADVERTISERS_LIST}
                   requestFunction={getAdvertisers}
                   columnsArray={AdvertisersColumns}
                   cardHeader={
                       {
                           text: 'All Advertisers',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('advertisers-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/demand/advertisers', 'manage-demand')
                           ],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={AdvertiserIndexFilter}
        />
    )
}

export default AdvertiserIndex;
