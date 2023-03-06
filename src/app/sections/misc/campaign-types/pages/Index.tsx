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
import {exportCampaignTypes, getCampaignTypes} from '../../../../requests/misc/CampaignType';
import CampaignTypeIndexFilter from '../partials/IndexFilter';
import {CampaignTypesColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const CampaignTypeIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_CAMPAIGN_TYPES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.CAMPAIGN_TYPES_LIST} requestFunction={getCampaignTypes}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ?
                            <FormSuccess type={searchParams.get('success')} model='campaign type'/> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Campaign Types' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, exportCampaignTypes),
                                          new FilterCardAction('campaign-types-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/campaign-types', 'manage-misc')]}/>

                        <KTCardBody>
                            <CampaignTypeIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <CampaignTypeTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const CampaignTypeTable = () => {
    const campaignTypes = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => campaignTypes, [campaignTypes]);
    const columns = useMemo(() => CampaignTypesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={campaignTypes.length > 0 ? campaignTypes[0] : null}
                   isLoading={isLoading}/>
    )
}

export default CampaignTypeIndex;
