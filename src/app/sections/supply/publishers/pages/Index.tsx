import React, {useEffect, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QUERIES} from '../../../../../_metronic/helpers';
import {EXPORT_ENDPOINT, getPublishers} from '../../../../requests/supply/publisher/Publisher';
import {PublishersColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../partials/KrysIndex';


const PublisherIndex: React.FC = () => {
    const krysApp = useKrysApp();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLISHERS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <KrysIndex queryId={QUERIES.PUBLISHERS_LIST}
                   requestFunction={()=>getPublishers('include[]=info&include[]=tier')}
                   columnsArray={PublishersColumns}
                   cardHeader={
                       {
                           text: 'All Publishers',
                           icon: 'fa-regular fa-list',
                           icon_style: 'fs-3 text-primary',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('publishers-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/supply/publishers', 'manage-supply')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   table={'default'}
        ></KrysIndex>
    )
}

export default PublisherIndex;