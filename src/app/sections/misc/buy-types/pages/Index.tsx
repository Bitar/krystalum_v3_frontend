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
import {PageTypes} from '../../../../helpers/variables';
import FormSuccess from '../../../../components/forms/FormSuccess';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {EXPORT_ENDPOINT, getBuyTypes} from '../../../../requests/misc/BuyType';
import {BuyTypesColumns} from '../core/TableColumns';
import BuyTypeIndexFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const BuyTypeIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUY_TYPES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.BUY_TYPE_LIST} requestFunction={getBuyTypes}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ?
                            <FormSuccess type={searchParams.get('success')} model='buy type'/> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Buy Types' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('buy-types-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/buy-types', 'manage-misc')]}/>

                        <KTCardBody>
                            <BuyTypeIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <BuyTypeTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const BuyTypeTable = () => {
    const buyTypes = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => buyTypes, [buyTypes]);
    const columns = useMemo(() => BuyTypesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={buyTypes.length > 0 ? buyTypes[0] : null}
                   isLoading={isLoading}/>
    )
}

export default BuyTypeIndex;
