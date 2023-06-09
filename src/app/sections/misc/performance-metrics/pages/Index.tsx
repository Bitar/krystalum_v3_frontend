import React, {useEffect, useState} from 'react';
import {QUERIES} from '../../../../../_metronic/helpers';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';

import {useKrysApp} from '../../../../modules/general/KrysApp';
import {EXPORT_ENDPOINT, getPerformanceMetrics} from '../../../../requests/misc/PerformanceMetric';
import {PerformanceMetricsColumns} from '../core/TableColumns';
import PerformanceMetricIndexFilter from '../partials/IndexFilter';

const PerformanceMetricIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_PERFORMANCE_METRICS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.PERFORMANCE_METRICS_LIST}
                   requestFunction={getPerformanceMetrics}
                   columnsArray={PerformanceMetricsColumns}
                   cardHeader={
                       {
                           text: 'All Performance Metrics',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('performance-metrics-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/performance-metrics', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={PerformanceMetricIndexFilter}
        />
    )
}

export default PerformanceMetricIndex;