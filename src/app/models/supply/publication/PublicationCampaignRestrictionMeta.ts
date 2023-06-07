import {Response} from '../../../../_metronic/helpers';
import {CampaignRestrictionRequirement} from '../../misc/CampaignRestrictionRequirement';
import {CampaignType} from '../../misc/CampaignType';
import {Country} from '../../misc/Country';
import {Format} from '../../misc/Format';
import {Region} from '../../misc/Region';
import {WebsitePage} from '../../misc/WebsitePage';
import {CampaignRestrictionType, GeoType} from '../Options';

export type PublicationCampaignRestrictionMeta = {
    id: number,
    campaign_restriction_meta: string
};

export type PublicationCampaignRestrictionMetaPaginate = Response<PublicationCampaignRestrictionMeta[]>;