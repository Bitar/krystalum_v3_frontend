import {UserCondensed} from '../iam/User';
import {Response} from '../../../_metronic/helpers';
import {CampaignCondensed} from './Campaign';

export type CampaignOrder = {
    id: number,
    campaign: CampaignCondensed,
    owner: UserCondensed,
    booking_order_number: string | null,
    created_at: string
    // TODO add the formats
}

export type CampaignOrderPaginate = Response<CampaignOrder[]>;

export type CampaignOrderList = {
    data: CampaignOrder[]
}