import React, {useEffect, useState} from 'react';

import {QUERIES} from '../../../../../_metronic/helpers'
import {ObjectivesColumns} from '../core/TableColumns';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import ObjectiveIndexFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import {EXPORT_ENDPOINT, getObjectives} from '../../../../requests/misc/Objective';
import KrysIndex from '../../../../components/tables/KrysIndex';


const ObjectiveIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_OBJECTIVES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.OBJECTIVES_LIST}
                   requestFunction={getObjectives}
                   columnsArray={ObjectivesColumns}
                   cardHeader={
                       {
                           text: 'All Objectives',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('objectives-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/objectives', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={ObjectiveIndexFilter}
        />
    )
}

export default ObjectiveIndex;