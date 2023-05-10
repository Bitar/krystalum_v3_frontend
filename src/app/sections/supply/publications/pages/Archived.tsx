import React, {useEffect, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QUERIES} from '../../../../../_metronic/helpers';
import {ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {EXPORT_ENDPOINT, getArchivedPublications} from '../../../../requests/supply/publication/Publication';
import {PublicationsColumns} from '../core/TableColumns';
import PublicationArchivedFilter from '../partials/filters/ArchivedFilter';

const PublicationArchived: React.FC = () => {
    const krysApp = useKrysApp();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLICATIONS, PageTypes.ARCHIVED))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <KrysIndex queryId={QUERIES.PUBLICATION_ARCHIVED_LIST}
                       requestFunction={getArchivedPublications}
                       columnsArray={PublicationsColumns}
                       cardHeader={
                           {
                               text: 'All Archived Publications',
                               actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                   new FilterCardAction('publications-list-filter', showFilter, setShowFilter),
                               ],
                           }}
                       showFilter={showFilter}
                       setExportQuery={setExportQuery}
                       FilterComponent={PublicationArchivedFilter}
            ></KrysIndex>
        </>
    )
}

export default PublicationArchived;