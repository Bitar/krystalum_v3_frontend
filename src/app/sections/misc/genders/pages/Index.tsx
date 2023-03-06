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
import {exportGenders, getGenders} from '../../../../requests/misc/Gender';
import GenderIndexFilter from '../partials/IndexFilter';
import {GendersColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const GenderIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_GENDERS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.GENDERS_LIST} requestFunction={getGenders}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ?
                            <FormSuccess type={searchParams.get('success')} model='gender'/> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Genders' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, exportGenders),
                                          new FilterCardAction('genders-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/genders', 'manage-misc')]}/>

                        <KTCardBody>
                            <GenderIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <GenderTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const GenderTable = () => {
    const genders = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => genders, [genders]);
    const columns = useMemo(() => GendersColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={genders.length > 0 ? genders[0] : null} isLoading={isLoading}/>
    )
}

export default GenderIndex;
