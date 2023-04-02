import React, {useEffect, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QUERIES} from '../../../../../_metronic/helpers';
import {EXPORT_ENDPOINT, getArchivedPublishers, getPublishers} from '../../../../requests/supply/publisher/Publisher';
import {PublishersColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import IndexFilter from '../partials/IndexFilter';
import PublisherIndexFilter from '../partials/IndexFilter';


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
                               actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                   new FilterCardAction('publishers-list-filter', showFilter, setShowFilter),
                                   new CreateCardAction('/supply/publishers', 'manage-supply')],
                           }}
                       showFilter={showFilter}
                       setExportQuery={setExportQuery}
                       FilterComponent={PublisherIndexFilter}
            ></KrysIndex>
        </>
    )
}

export default PublisherArchived;