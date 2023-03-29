import React, {useEffect, useState} from 'react';
import {QUERIES} from '../../../../../_metronic/helpers';
import {PageTypes} from '../../../../helpers/variables';
import {VerticalsColumns} from '../core/TableColumns';
import {EXPORT_ENDPOINT, getVerticals} from '../../../../requests/misc/Vertical';
import VerticalIndexFilter from '../partials/IndexFilter';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';

const VerticalIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_VERTICALS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.VERTICALS_LIST}
                   requestFunction={getVerticals}
                   columnsArray={VerticalsColumns}
                   cardHeader={
                       {
                           text: 'All Verticals',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('verticals-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/verticals', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={VerticalIndexFilter}
        />
    )
}

export default VerticalIndex;