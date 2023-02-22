import {ID, Response} from '../../../_metronic/helpers';

export type AdvertiserIndustry = {
    id: ID,
    name: string
};

export type AdvertiserIndustryPaginate = Response<AdvertiserIndustry[]>;

export type AdvertiserIndustryList = {
    data: AdvertiserIndustry[]
}

export const defaultAdvertiserIndustry: AdvertiserIndustry = {id: 0, name: ""};