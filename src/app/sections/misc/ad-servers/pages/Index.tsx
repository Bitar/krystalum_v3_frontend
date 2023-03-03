import React, {useEffect, useMemo, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../../../modules/table/QueryResponseProvider';
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers';
import {ListViewProvider} from '../../../../modules/table/ListViewProvider';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import KrysTable from '../../../../components/tables/KrysTable';
import {exportAdServers, getAdServers} from '../../../../requests/misc/AdServer';
import AdServerIndexFilter from '../partials/IndexFilter';
import {AdServersColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const AdServerIndex: React.FC = () => {
    const krysApp = useKrysApp();

    const [exportQuery, setExportQuery] = useState<string>('');

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_AD_SERVERS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.AD_SERVERS_LIST} requestFunction={getAdServers}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Ad Servers' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, exportAdServers),
                                          new FilterCardAction('ad-servers-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/ad-servers')]}/>

                        <KTCardBody>
                            <AdServerIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <AdServerTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const AdServerTable = () => {
    const adServers = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => adServers, [adServers]);
    const columns = useMemo(() => AdServersColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={adServers.length > 0 ? adServers[0] : null}
                   isLoading={isLoading}/>
    )
}

export default AdServerIndex;