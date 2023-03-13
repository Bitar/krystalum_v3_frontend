import React, {useEffect, useMemo, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
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
import {TradingDesksColumns} from '../core/TableColumns';
import TradingDeskFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";
import {EXPORT_ENDPOINT, getTradingDesks} from '../../../../requests/demand/TradingDesk';


const TradingDeskIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_TRADING_DESKS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [exportQuery, setExportQuery] = useState<string>('');

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.TRADING_DESKS_LIST} requestFunction={getTradingDesks}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Trading Desks' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('trading-desks-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/demand/trading-desks', 'manage-demand')]}/>

                        <KTCardBody>
                            <TradingDeskFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <TradingDeskTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const TradingDeskTable = () => {
    const tradingDesks = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => tradingDesks, [tradingDesks]);
    const columns = useMemo(() => TradingDesksColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={tradingDesks.length > 0 ? tradingDesks[0] : null}
                   isLoading={isLoading}/>
    )
}

export default TradingDeskIndex;