import React, {useEffect, useState} from 'react';
import {QUERIES} from '../../../../../_metronic/helpers';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';

import {useKrysApp} from '../../../../modules/general/KrysApp';
import {EXPORT_ENDPOINT, getTiers} from '../../../../requests/misc/Tier';
import {TierColumns} from '../core/TableColumns';
import TierIndexFilter from '../partials/IndexFilter';

const TierIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_TIERS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [exportQuery, setExportQuery] = useState<string>('');

    return (
        <KrysIndex queryId={QUERIES.TIERS_LIST}
                   requestFunction={getTiers}
                   columnsArray={TierColumns}
                   cardHeader={
                       {
                           text: 'All Tiers',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('tiers-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/tiers', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={TierIndexFilter}
        />
    )
}

export default TierIndex;