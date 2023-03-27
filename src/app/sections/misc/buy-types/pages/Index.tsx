import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {EXPORT_ENDPOINT, getBuyTypes} from '../../../../requests/misc/BuyType';
import {BuyTypesColumns} from '../core/TableColumns';
import BuyTypeIndexFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';

const BuyTypeIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUY_TYPES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.BUY_TYPE_LIST}
                   requestFunction={getBuyTypes}
                   columnsArray={BuyTypesColumns}
                   cardHeader={
                       {
                           text: 'All Buy Types',
                           icon: 'fa-regular fa-list',
                           icon_style: 'fs-3 text-primary',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('buy-types-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/buy-types', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={BuyTypeIndexFilter}
        />
    )
}

export default BuyTypeIndex;
