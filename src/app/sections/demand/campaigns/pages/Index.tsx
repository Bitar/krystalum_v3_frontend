import React, {useEffect, useMemo, useState} from 'react'

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {EXPORT_ENDPOINT, getCampaigns} from '../../../../requests/demand/Campaign'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {CampaignsColumns} from '../core/TableColumn'
import KrysTable from '../../../../components/tables/KrysTable';
import {PageTypes} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import CampaignIndexFilter from '../partials/IndexFilter';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {Sections} from "../../../../helpers/sections";
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const CampaignIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_CAMPAIGNS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.CAMPAIGNS_LIST} requestFunction={getCampaigns}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Campaigns'
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('TODO-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/demand/campaigns', 'manage-demand')
                                      ]}/>
                        <KTCardBody>
                            <CampaignIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <CampaignTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const CampaignTable = () => {
    const campaigns = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => campaigns, [campaigns]);
    const columns = useMemo(() => CampaignsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={campaigns.length > 0 ? campaigns[0] : null}
                   isLoading={isLoading}/>
    )
}

export default CampaignIndex;
