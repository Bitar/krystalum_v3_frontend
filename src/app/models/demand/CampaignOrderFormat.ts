import {Response} from '../../../_metronic/helpers';
import {CampaignOrder} from './CampaignOrder';

export type CampaignOrderFormat = {
    id: number,
    unique_identifier: string,
    campaign_order: CampaignOrder
}

export type CampaignOrderFormatPaginate = Response<CampaignOrderFormat[]>;

export type CampaignOrderFormatList = {
    data: CampaignOrderFormat[]
}