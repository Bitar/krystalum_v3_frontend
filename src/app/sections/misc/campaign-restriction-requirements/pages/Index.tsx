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
import {CampaignRestrictionRequirementsColumns} from '../core/TableColumns';
import CampaignRestrictionRequirementIndexFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";
import {
    exportCampaignRestrictionRequirements,
    getCampaignRestrictionRequirements
} from '../../../../requests/misc/CampaignRestrictionRequirement';


const CampaignRestrictionRequirementIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_CAMPAIGN_RESTRICTION_REQUIREMENTS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [exportQuery, setExportQuery] = useState<string>('');

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.CAMPAIGN_RESTRICTION_REQUIREMENTS_LIST} requestFunction={getCampaignRestrictionRequirements}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Campaign Restriction Requirements' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, exportCampaignRestrictionRequirements),
                                          new FilterCardAction('campaign-restriction-requirements-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/campaign-restriction-requirements', 'manage-misc')]}/>

                        <KTCardBody>
                            <CampaignRestrictionRequirementIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <CampaignRestrictionRequirementTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const CampaignRestrictionRequirementTable = () => {
    const campaignRestrictionRequirements = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => campaignRestrictionRequirements, [campaignRestrictionRequirements]);
    const columns = useMemo(() => CampaignRestrictionRequirementsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={campaignRestrictionRequirements.length > 0 ? campaignRestrictionRequirements[0] : null}
                   isLoading={isLoading}/>
    )
}

export default CampaignRestrictionRequirementIndex;