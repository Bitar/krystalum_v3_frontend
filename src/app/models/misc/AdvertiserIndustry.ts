import {Response} from '../../../_metronic/helpers';

export type AdvertiserIndustry = {
    id: number,
    name: string
};

export type AdvertiserIndustryPaginate = Response<AdvertiserIndustry[]>;

export type AdvertiserIndustryList = {
    data: AdvertiserIndustry[]
}

export const defaultAdvertiserIndustry: AdvertiserIndustry = {id: 0, name: ""};