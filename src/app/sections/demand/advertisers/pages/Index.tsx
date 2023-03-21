import React, {useEffect, useMemo, useState} from 'react'

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {EXPORT_ENDPOINT, getAdvertisers} from '../../../../requests/demand/Advertiser'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {AdvertisersColumns} from '../core/TableColumn'
import KrysTable from '../../../../components/tables/KrysTable';
import {PageTypes} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import AdvertiserIndexFilter from '../partials/IndexFilter';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {Sections} from "../../../../helpers/sections";
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const AdvertiserIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.TODO, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.TODO} requestFunction={getAdvertisers}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Advertisers' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('TODO-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('TODO', 'TODO')
                                      ]}/>
                        <KTCardBody>
                            <AdvertiserIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <AdvertiserTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const AdvertiserTable = () => {
    const objects = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => data, [data]);
    const columns = useMemo(() => TableColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={objects.length > 0 ? objects[0] : null} isLoading={isLoading}/>
    )
}

export default AdvertiserIndex;
