import {Response} from '../../../../_metronic/helpers';
import {CampaignRestrictionRequirement} from '../../misc/CampaignRestrictionRequirement';
import {CampaignType} from '../../misc/CampaignType';
import {Country} from '../../misc/Country';
import {Format} from '../../misc/Format';
import {Region} from '../../misc/Region';
import {WebsitePage} from '../../misc/WebsitePage';
import {CampaignRestrictionType, GeoType} from '../Options';

export type PublicationCampaignRestriction = {
    id: number,
    type: CampaignRestrictionType,
    geoType: GeoType,
    geo: Region | Country,
    format: Format,
    campaignType: CampaignType | null,
    websitePage: WebsitePage | null,
    campaignRestrictionRequirement: CampaignRestrictionRequirement | null,
};

export type PublicationCampaignRestrictionPaginate = Response<PublicationCampaignRestriction[]>;
