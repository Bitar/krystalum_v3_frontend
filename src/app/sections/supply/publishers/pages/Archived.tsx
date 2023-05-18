import React, {useEffect, useState} from 'react';
import {QUERIES} from '../../../../../_metronic/helpers';
import {ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {ARCHIVED_EXPORT_ENDPOINT, getArchivedPublishers} from '../../../../requests/supply/publisher/Publisher';
import {PublishersColumns} from '../core/TableColumns';
import PublisherArchivedFilter from '../partials/filters/ArchivedFilter';


const PublisherArchived: React.FC = () => {
    const krysApp = useKrysApp();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

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
                               actions: [new ExportCardAction(exportQuery, ARCHIVED_EXPORT_ENDPOINT),
                                   new FilterCardAction('publishers-list-filter', showFilter, setShowFilter)],
                           }}
                       showFilter={showFilter}
                       setExportQuery={setExportQuery}
                       FilterComponent={PublisherArchivedFilter}
            ></KrysIndex>
        </>
    )
}

export default PublisherArchived;