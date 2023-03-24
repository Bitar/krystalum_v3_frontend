import {Response} from '../../../_metronic/helpers';

export type CampaignRestrictionRequirement = {
    id: number,
    name: string
};

export type CampaignRestrictionRequirementPaginate = Response<CampaignRestrictionRequirement[]>;

export type CampaignRestrictionRequirementList = {
    data: CampaignRestrictionRequirement[]
}