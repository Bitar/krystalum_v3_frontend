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
import {EXPORT_ENDPOINT, getLanguages} from '../../../../requests/misc/Language';
import LanguageIndexFilter from '../partials/IndexFilter';
import {LanguagesColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const LanguageIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_LANGUAGES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.LANGUAGES_LIST} requestFunction={getLanguages}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ? <FormSuccess type={searchParams.get('success')} model='language' /> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Languages' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('languages-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/languages', 'manage-misc')]}/>

                        <KTCardBody>
                            <LanguageIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <LanguageTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const LanguageTable = () => {
    const languages = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => languages, [languages]);
    const columns = useMemo(() => LanguagesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={languages.length > 0 ? languages[0] : null} isLoading={isLoading} />
    )
}

export default LanguageIndex;
