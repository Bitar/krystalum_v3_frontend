import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {EXPORT_ENDPOINT, getBuyingModels} from '../../../../requests/misc/BuyingModel';
import {BuyingModelsColumns} from '../core/TableColumns';
import BuyingModelIndexFilter from '../partials/IndexFilter';

const BuyingModelIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUYING_MODELS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.BUYING_MODELS_LIST}
                   requestFunction={getBuyingModels}
                   columnsArray={BuyingModelsColumns}
                   cardHeader={
                       {
                           text: 'All Buying Models',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('buying-models-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/buying-models', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={BuyingModelIndexFilter}
        />
    )
}

export default BuyingModelIndex;
