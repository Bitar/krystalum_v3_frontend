import {Response} from '../../../_metronic/helpers';
import {CountryCondensed} from '../misc/Country';
import {AdvertiserIndustry} from '../misc/AdvertiserIndustry';

export type AdvertiserContact = {
    id: number,
    contact_name: string | null,
    agency_name: string | null,
    contact_info: string
}

export type AdvertiserContactPaginate = Response<AdvertiserContact[]>;

export type AdvertiserContactList = {
    data: AdvertiserContact[]
}

export type AdvertiserInfo = {
    id: number,
    address: string,
    country: CountryCondensed,
    industry: AdvertiserIndustry | null,
    trade_license_path: string | null
};

export type Advertiser = {
    id: number,
    name: string,
    info?: AdvertiserInfo | null,
    contacts?: AdvertiserContact[] | null
};

export type AdvertiserPaginate = Response<Advertiser[]>;

export type AdvertiserList = {
    data: Advertiser[]
}