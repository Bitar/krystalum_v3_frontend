import React, {useEffect, useState} from 'react';
import {QUERIES} from '../../../../../_metronic/helpers';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {
    EXPORT_ENDPOINT,
    getCampaignRestrictionRequirements
} from '../../../../requests/misc/CampaignRestrictionRequirement';
import {CampaignRestrictionRequirementsColumns} from '../core/TableColumns';
import CampaignRestrictionRequirementIndexFilter from '../partials/IndexFilter';


const CampaignRestrictionRequirementIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_CAMPAIGN_RESTRICTION_REQUIREMENTS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [exportQuery, setExportQuery] = useState<string>('');

    return (
        <KrysIndex queryId={QUERIES.CAMPAIGN_RESTRICTION_REQUIREMENTS_LIST}
                   requestFunction={getCampaignRestrictionRequirements}
                   columnsArray={CampaignRestrictionRequirementsColumns}
                   cardHeader={
                       {
                           text: 'All Campaign Restriction Requirements',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('campaign-restriction-requirements-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/campaign-restriction-requirements', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={CampaignRestrictionRequirementIndexFilter}
        />
    )
}

export default CampaignRestrictionRequirementIndex;