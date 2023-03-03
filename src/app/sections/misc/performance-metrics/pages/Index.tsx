import React, {useEffect, useMemo, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, PageTypes} from '../../../../helpers/variables';
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../../../modules/table/QueryResponseProvider';
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers';
import {ListViewProvider} from '../../../../modules/table/ListViewProvider';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import KrysTable from '../../../../components/tables/KrysTable';
import {PerformanceMetricsColumns} from '../core/TableColumns';
import {getPerformanceMetrics} from '../../../../requests/misc/PerformanceMetric';
import PerformanceMetricIndexFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";
import {exportUsers} from "../../../../requests/iam/User";

const PerformanceMetricIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_PERFORMANCE_METRICS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.PERFORMANCE_METRICS_LIST} requestFunction={getPerformanceMetrics}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Performance Metrics' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new FilterCardAction('performance-metrics-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/iam/performance-metrics')
                                      ]}/>

                        <KTCardBody>
                            <PerformanceMetricIndexFilter showFilter={showFilter}/>

                            <PerformanceMetricTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const PerformanceMetricTable = () => {
    const performanceMetrics = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => performanceMetrics, [performanceMetrics]);
    const columns = useMemo(() => PerformanceMetricsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={performanceMetrics.length > 0 ? performanceMetrics[0] : null}
                   isLoading={isLoading}/>
    )
}

export default PerformanceMetricIndex;