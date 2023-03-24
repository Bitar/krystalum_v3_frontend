import {Response} from '../../../_metronic/helpers';

export type CampaignType = {
    id: number,
    name: string
};

export type CampaignTypePaginate = Response<CampaignType[]>;

export type CampaignTypeList = {
    data: CampaignType[]
}