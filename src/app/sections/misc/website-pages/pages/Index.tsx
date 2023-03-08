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
import {WebsitePagesColumns} from '../core/TableColumns';
import WebsitePageIndexFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";
import {exportWebsitePages, getWebsitePages} from '../../../../requests/misc/WebsitePage';


const WebsitePageIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_WEBSITE_PAGES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [exportQuery, setExportQuery] = useState<string>('');

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.WEBSITE_PAGES_LIST} requestFunction={getWebsitePages}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Website Pages' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, exportWebsitePages),
                                          new FilterCardAction('website-pages-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/website-pages', 'manage-misc')]}/>

                        <KTCardBody>
                            <WebsitePageIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <WebsitePageTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const WebsitePageTable = () => {
    const websitePages = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => websitePages, [websitePages]);
    const columns = useMemo(() => WebsitePagesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={websitePages.length > 0 ? websitePages[0] : null}
                   isLoading={isLoading}/>
    )
}

export default WebsitePageIndex;