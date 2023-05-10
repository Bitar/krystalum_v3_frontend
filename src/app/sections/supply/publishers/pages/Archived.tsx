import React, {useEffect, useState} from 'react';

import {QUERIES} from '../../../../../_metronic/helpers';

import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {
    ARCHIVED_EXPORT_ENDPOINT,
    getArchivedPublishers
} from '../../../../requests/supply/publisher/Publisher';
import {PublishersColumns} from '../core/TableColumns';
import {ExportCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import PublisherIndexFilter from '../partials/IndexFilter';


const PublisherArchived: React.FC = () => {
    const krysApp = useKrysApp();

    const [exportQuery, setExportQuery] = useState<string>('');

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLISHERS, PageTypes.ARCHIVED))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <KrysIndex queryId={QUERIES.PUBLISHERS_ARCHIVED_LIST}
                       requestFunction={getArchivedPublishers}
                       columnsArray={PublishersColumns}
                       cardHeader={
                           {
                               text: 'All Archived Publishers',
                               actions: [new ExportCardAction(exportQuery, ARCHIVED_EXPORT_ENDPOINT)],
                           }}
                       showFilter={false}
                       setExportQuery={setExportQuery}
                       FilterComponent={PublisherIndexFilter}
            ></KrysIndex>
        </>
    )
}

export default PublisherArchived;