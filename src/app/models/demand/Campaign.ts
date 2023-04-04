import {Response} from '../../../_metronic/helpers';
import {BookingTypeCondensed} from '../misc/BookingType';
import {BuyType} from '../misc/BuyType';
import {CountryCondensed} from '../misc/Country';
import {Advertiser} from './Advertiser';
import {AgencyCondensed} from './Agency';
import {RegionCondensed} from '../misc/Region';
import {UserCondensed} from '../iam/User';
import {Objective} from '../misc/Objective';

export type Campaign = {
    id: number,
    unique_identifier: string,
    name: string,
    bookingType: BookingTypeCondensed,
    buyType: BuyType | null, // this might be null in case of BO
    seat_id: string | null, // this might be null in case of BO
    revenueCountry: CountryCondensed,
    advertiser_type: string,
    advertiser: Advertiser, // the advertiser is always set
    agency: AgencyCondensed | null, // could be null in case advertiser is not with agency
    region: RegionCondensed,
    created_at: Date,
    owner: UserCondensed | null,
    objectives?: Objective[] | null

    // TODO add publisher
};

export type CampaignPaginate = Response<Campaign[]>;

export type CampaignList = {
    data: Campaign[]
}