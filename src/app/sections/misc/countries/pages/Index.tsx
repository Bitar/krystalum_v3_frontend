import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {EXPORT_ENDPOINT, getCountries} from '../../../../requests/misc/Country';
import CountryIndexFilter from '../partials/IndexFilter';
import {CountriesColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';

const CountryIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_COUNTRIES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.COUNTRIES_LIST}
                   requestFunction={getCountries}
                   columnsArray={CountriesColumns}
                   cardHeader={
                       {
                           text: 'All Countries',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('countries-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/countries', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={CountryIndexFilter}
        />
    )
}

export default CountryIndex;
