import {useSearchParams} from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react'

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import KrysTable from '../../../../components/tables/KrysTable';
import {Actions, PageTypes} from '../../../../helpers/variables';
import FormSuccess from '../../../../components/forms/FormSuccess';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {getMetrics} from '../../../../requests/misc/Metric';
import MetricIndexFilter from '../partials/IndexFilter';
import {MetricsColumns} from '../core/TableColumns';

const MetricIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_METRICS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.METRICS_LIST} requestFunction={getMetrics}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ? <FormSuccess type={searchParams.get('success')} model='metric' /> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Metrics' icon="fa-regular fa-list" icon_style="fs-3 text-primary" actions={[{
                            type: Actions.FILTER,
                            target: 'metrics-list-filter',
                            showFilter: showFilter,
                            setShowFilter: setShowFilter
                        }, {type: Actions.CREATE, url: '/misc/metrics'}]}/>

                        <KTCardBody>
                            <MetricIndexFilter showFilter={showFilter} />

                            <MetricTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const MetricTable = () => {
    const metrics = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => metrics, [metrics]);
    const columns = useMemo(() => MetricsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={metrics.length > 0 ? metrics[0] : null} isLoading={isLoading} />
    )
}

export default MetricIndex;
