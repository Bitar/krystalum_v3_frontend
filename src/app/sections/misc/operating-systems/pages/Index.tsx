import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {EXPORT_ENDPOINT, getOperatingSystems} from '../../../../requests/misc/OperatingSystem';
import OperatingSystemIndexFilter from '../partials/IndexFilter';
import {OperatingSystemsColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';

const OperatingSystemIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_OPERATING_SYSTEMS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.OPERATING_SYSTEMS_LIST}
                   requestFunction={getOperatingSystems}
                   columnsArray={OperatingSystemsColumns}
                   cardHeader={
                       {
                           text: 'All Operating Systems',
                           icon: 'fa-regular fa-list',
                           icon_style: 'fs-3 text-primary',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('operating-systems-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/operating-systems', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={OperatingSystemIndexFilter}
        />
    )
}

export default OperatingSystemIndex;
