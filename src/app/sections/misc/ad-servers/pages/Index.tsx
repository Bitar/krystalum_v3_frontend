import React, {useEffect, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QUERIES} from '../../../../../_metronic/helpers';
import {EXPORT_ENDPOINT, getAdServers} from '../../../../requests/misc/AdServer';
import AdServerIndexFilter from '../partials/IndexFilter';
import {AdServersColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';


const AdServerIndex: React.FC = () => {
    const krysApp = useKrysApp();

    const [exportQuery, setExportQuery] = useState<string>('');

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_AD_SERVERS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.AD_SERVERS_LIST}
                   requestFunction={getAdServers}
                   columnsArray={AdServersColumns}
                   cardHeader={
                       {
                           text: 'All Ad Servers',
                           icon: 'fa-regular fa-list',
                           icon_style: 'fs-3 text-primary',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('ad-servers-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/ad-servers', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={AdServerIndexFilter}
        />
    )
}

export default AdServerIndex;