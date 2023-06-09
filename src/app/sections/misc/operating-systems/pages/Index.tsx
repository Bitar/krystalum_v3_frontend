import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {EXPORT_ENDPOINT, getOperatingSystems} from '../../../../requests/misc/OperatingSystem';
import {OperatingSystemsColumns} from '../core/TableColumns';
import OperatingSystemIndexFilter from '../partials/IndexFilter';

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
