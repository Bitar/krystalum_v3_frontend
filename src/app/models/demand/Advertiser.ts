import {Response} from '../../../_metronic/helpers';
import {CountryCondensed} from '../misc/Country';
import {AdvertiserIndustry} from '../misc/AdvertiserIndustry';

export type AdvertiserInfo = {
    id: number,
    address: string,
    country: CountryCondensed,
    industry: AdvertiserIndustry | null,
    tradeLicensePath: string | null
};

export type Advertiser = {
    id: number,
    name: string,
    info: AdvertiserInfo | null
};

export type AdvertiserPaginate = Response<Advertiser[]>;

export type AdvertiserList = {
    data: Advertiser[]
}

export const defaultAdvertiser: Advertiser = {id: 0, name: '', info: null};