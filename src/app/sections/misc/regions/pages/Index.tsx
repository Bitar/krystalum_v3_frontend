import React, {useEffect, useState} from 'react';
import {QUERIES} from '../../../../../_metronic/helpers';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';

import {useKrysApp} from '../../../../modules/general/KrysApp';
import {EXPORT_ENDPOINT, getRegions} from '../../../../requests/misc/Region';
import {RegionsColumns} from '../core/TableColumns';
import RegionIndexFilter from '../partials/IndexFilter';

const RegionIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_REGIONS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.REGIONS_LIST}
                   requestFunction={getRegions}
                   columnsArray={RegionsColumns}
                   cardHeader={
                       {
                           text: 'All Regions',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('regions-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/regions', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={RegionIndexFilter}
        />
    )
}

export default RegionIndex;