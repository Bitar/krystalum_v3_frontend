import React, {useEffect, useState} from 'react';
import {QUERIES} from '../../../../../_metronic/helpers';
import {PageTypes} from '../../../../helpers/variables';
import {FormatsColumns} from '../core/TableColumns';
import {EXPORT_ENDPOINT, getFormats} from '../../../../requests/misc/Format';
import FormatIndexFilter from '../partials/IndexFilter';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';

const FormatIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_FORMATS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.FORMATS_LIST}
                   requestFunction={getFormats}
                   columnsArray={FormatsColumns}
                   cardHeader={
                       {
                           text: 'All Formats',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('formats-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/formats', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={FormatIndexFilter}
        />
    )
}

export default FormatIndex;