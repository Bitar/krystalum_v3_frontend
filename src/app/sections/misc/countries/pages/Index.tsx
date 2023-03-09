import {useSearchParams} from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react'

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import KrysTable from '../../../../components/tables/KrysTable';
import {PageTypes} from '../../../../helpers/variables';
import FormSuccess from '../../../../components/forms/FormSuccess';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {EXPORT_ENDPOINT, getCountries} from '../../../../requests/misc/Country';
import CountryIndexFilter from '../partials/IndexFilter';
import {CountriesColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const CountryIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_COUNTRIES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.COUNTRY_LIST} requestFunction={getCountries}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ?
                            <FormSuccess type={searchParams.get('success')} model='country'/> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Countries' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('countries-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/countries', 'manage-misc')]}/>

                        <KTCardBody>
                            <CountryIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <CountryTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const CountryTable = () => {
    const countries = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => countries, [countries]);
    const columns = useMemo(() => CountriesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={countries.length > 0 ? countries[0] : null}
                   isLoading={isLoading}/>
    )
}

export default CountryIndex;
