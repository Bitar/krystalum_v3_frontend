import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {EXPORT_ENDPOINT, getCities} from '../../../../requests/misc/City';
import {CitiesColumns} from '../core/TableColumns';
import CityIndexFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';

const CityIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_CITIES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.CITIES_LIST}
                   requestFunction={getCities}
                   columnsArray={CitiesColumns}
                   cardHeader={
                       {
                           text: 'All Cities',
                           icon: 'fa-regular fa-list',
                           icon_style: 'fs-3 text-primary',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('cities-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/cities', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={CityIndexFilter}
        />
    )
}

export default CityIndex;
