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
import {EXPORT_ENDPOINT, getOperatingSystems} from '../../../../requests/misc/OperatingSystem';
import OperatingSystemIndexFilter from '../partials/IndexFilter';
import {OperatingSystemsColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const OperatingSystemIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_OPERATING_SYSTEMS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.OPERATING_SYSTEMS_LIST} requestFunction={getOperatingSystems}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ? <FormSuccess type={searchParams.get('success')} model='operating system' /> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Operating Systems' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('operating-systems-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/operating-systems', 'manage-misc')]}/>

                        <KTCardBody>
                            <OperatingSystemIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <OperatingSystemTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const OperatingSystemTable = () => {
    const operatingSystems = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => operatingSystems, [operatingSystems]);
    const columns = useMemo(() => OperatingSystemsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={operatingSystems.length > 0 ? operatingSystems[0] : null} isLoading={isLoading} />
    )
}

export default OperatingSystemIndex;
