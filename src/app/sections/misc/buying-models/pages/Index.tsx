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
import {getBuyingModels} from '../../../../requests/misc/BuyingModel';
import BuyingModelIndexFilter from '../partials/IndexFilter';
import {BuyingModelsColumns} from '../core/TableColumns';

const BuyingModelIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUYING_MODELS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.BUYING_MODEL_LIST} requestFunction={getBuyingModels}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ? <FormSuccess type={searchParams.get('success')} model='buying model' /> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Buying Models' icon="fa-regular fa-list" icon_style="fs-3 text-primary" actions={[{
                            type: Actions.FILTER,
                            target: 'buying-models-list-filter',
                            showFilter: showFilter,
                            setShowFilter: setShowFilter
                        }, {type: Actions.CREATE, url: '/misc/buying-models'}]}/>

                        <KTCardBody>
                            <BuyingModelIndexFilter showFilter={showFilter} />

                            <BuyingModelTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const BuyingModelTable = () => {
    const buyingModels = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => buyingModels, [buyingModels]);
    const columns = useMemo(() => BuyingModelsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={buyingModels.length > 0 ? buyingModels[0] : null} isLoading={isLoading} />
    )
}

export default BuyingModelIndex;
