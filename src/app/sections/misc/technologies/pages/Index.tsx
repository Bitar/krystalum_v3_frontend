import React, {useEffect, useState} from 'react';

import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QUERIES} from '../../../../../_metronic/helpers';
import {TechnologiesColumns} from '../core/TableColumns';
import {EXPORT_ENDPOINT, getTechnologies} from '../../../../requests/misc/Technology';
import TechnologyIndexFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';


const TechnologyIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_TECHNOLOGIES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [exportQuery, setExportQuery] = useState<string>('');

    return (
        <KrysIndex queryId={QUERIES.TECHNOLOGIES_LIST}
                   requestFunction={getTechnologies}
                   columnsArray={TechnologiesColumns}
                   cardHeader={
                       {
                           text: 'All Technologies',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('technologies-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/technologies', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={TechnologyIndexFilter}
        />
    )
}

export default TechnologyIndex;