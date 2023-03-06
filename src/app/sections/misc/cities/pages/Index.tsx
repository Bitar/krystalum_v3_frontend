import {useSearchParams} from 'react-router-dom';
import React, {useEffect, useMemo, useState} from 'react'

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
import {exportCities, getCities} from '../../../../requests/misc/City';
import {CitiesColumns} from '../core/TableColumns';
import CityIndexFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const CityIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_CITIES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.CITY_LIST} requestFunction={getCities}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ?
                            <FormSuccess type={searchParams.get('success')} model='city'/> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Cities' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, exportCities),
                                          new FilterCardAction('cities-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/cities', 'manage-misc')]}/>

                        <KTCardBody>
                            <CityIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <CityTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const CityTable = () => {
    const cities = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => cities, [cities]);
    const columns = useMemo(() => CitiesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={cities.length > 0 ? cities[0] : null}
                   isLoading={isLoading}/>
    )
}

export default CityIndex;
