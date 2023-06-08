import React, {useEffect, useState} from 'react';
import {QUERIES} from '../../../../../_metronic/helpers';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {EXPORT_ENDPOINT, getAdvertiserIndustries} from '../../../../requests/misc/AdvertiserIndustry';
import {AdvertiserIndustriesColumns} from '../core/TableColumns';
import AdvertiserIndustryIndexFilter from '../partials/IndexFilter';


const AdvertiserIndustryIndex: React.FC = () => {
    const krysApp = useKrysApp();

    const [exportQuery, setExportQuery] = useState<string>('');

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_ADVERTISER_INDUSTRIES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.ADVERTISER_INDUSTRIES_LIST}
                   requestFunction={getAdvertiserIndustries}
                   columnsArray={AdvertiserIndustriesColumns}
                   cardHeader={
                       {
                           text: 'All Advertiser Industries',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('advertiser-industries-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/advertiser-industries', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={AdvertiserIndustryIndexFilter}
        />
    )
}

export default AdvertiserIndustryIndex;