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
import {exportAudiences, getAudiences} from '../../../../requests/misc/Audience';
import AudienceIndexFilter from '../partials/IndexFilter';
import {AudiencesColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const AudienceIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_AUDIENCES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.AUDIENCES_LIST} requestFunction={getAudiences}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ? <FormSuccess type={searchParams.get('success')} model='audience' /> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Audiences' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, exportAudiences),
                                          new FilterCardAction('audiences-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/audiences', 'manage-misc')]}/>

                        <KTCardBody>
                            <AudienceIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <AudienceTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const AudienceTable = () => {
    const audiences = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => audiences, [audiences]);
    const columns = useMemo(() => AudiencesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={audiences.length > 0 ? audiences[0] : null} isLoading={isLoading} />
    )
}

export default AudienceIndex;
