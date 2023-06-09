import React, {useEffect, useState} from 'react';
import {QUERIES} from '../../../../../_metronic/helpers';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';

import {useKrysApp} from '../../../../modules/general/KrysApp';
import {EXPORT_ENDPOINT, getWebsitePages} from '../../../../requests/misc/WebsitePage';
import {WebsitePagesColumns} from '../core/TableColumns';
import WebsitePageIndexFilter from '../partials/IndexFilter';

const WebsitePageIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_WEBSITE_PAGES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [exportQuery, setExportQuery] = useState<string>('');

    return (
        <KrysIndex queryId={QUERIES.WEBSITE_PAGES_LIST}
                   requestFunction={getWebsitePages}
                   columnsArray={WebsitePagesColumns}
                   cardHeader={
                       {
                           text: 'All Website Pages',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('website-pages-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/website-pages', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={WebsitePageIndexFilter}
        />
    )
}

export default WebsitePageIndex;