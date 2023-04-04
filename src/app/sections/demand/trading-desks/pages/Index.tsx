import React, {useEffect, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QUERIES} from '../../../../../_metronic/helpers';
import {TradingDesksColumns} from '../core/TableColumns';
import TradingDeskFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";
import {EXPORT_ENDPOINT, getTradingDesks} from '../../../../requests/demand/TradingDesk';
import KrysIndex from '../../../../components/tables/KrysIndex';


const TradingDeskIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_TRADING_DESKS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [exportQuery, setExportQuery] = useState<string>('');

    return (
        <KrysIndex queryId={QUERIES.TRADING_DESKS_LIST}
                   requestFunction={getTradingDesks}
                   columnsArray={TradingDesksColumns}
                   cardHeader={
                       {
                           text: 'All Trading Desks',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('trading-desks-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/demand/trading-desks', 'manage-demand')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={TradingDeskFilter}
        />
    )
}

export default TradingDeskIndex;