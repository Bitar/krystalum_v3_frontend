import React, {useEffect, useMemo, useState} from 'react';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../../../modules/table/QueryResponseProvider';
import KrysTable from '../../../../components/tables/KrysTable';
import {KpisColumns} from '../core/TableColumns';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider';
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers';
import {ListViewProvider} from '../../../../modules/table/ListViewProvider';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {EXPORT_ENDPOINT, getKpis} from '../../../../requests/misc/Kpi';
import KpiIndexFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const KpiIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_KPIS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.KPIS_LIST} requestFunction={getKpis}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All KPIs' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('kpis-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/kpis', 'manage-misc')]}/>

                        <KTCardBody>
                            <KpiIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <KpiTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const KpiTable = () => {
    const kpis = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => kpis, [kpis]);
    const columns = useMemo(() => KpisColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={kpis.length > 0 ? kpis[0] : null}
                   isLoading={isLoading}/>
    )
}

export default KpiIndex;