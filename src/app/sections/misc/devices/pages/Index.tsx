import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {EXPORT_ENDPOINT, getDevices} from '../../../../requests/misc/Device';
import DeviceIndexFilter from '../partials/IndexFilter';
import {DevicesColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';

const DeviceIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_DEVICES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.DEVICES_LIST}
                   requestFunction={getDevices}
                   columnsArray={DevicesColumns}
                   cardHeader={
                       {
                           text: 'All Devices',
                           icon: 'fa-regular fa-list',
                           icon_style: 'fs-3 text-primary',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('devices-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/devices', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={DeviceIndexFilter}
        />
    )
}

export default DeviceIndex;
