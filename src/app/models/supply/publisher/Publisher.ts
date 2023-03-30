import {Response} from '../../../../_metronic/helpers';
import {Tier} from '../../misc/Tier';
import {Country} from '../../misc/Country';
import {PublisherAccountManager} from '../publisher/PublisherAccountManager';

export type Publisher = {
    id: number,
    name: string,
    tier: Tier | null,
    integration_date: Date | null,
    revenue_type: string,
    revenue_share: number | null,
    commitment: string | null,
    info: PublisherInfo | null,
    accountManager: PublisherAccountManager | null
};

export type PublisherInfo = {
    id: number,
    email: string | null,
    hq_address: string | null,
    hq_country: Country | null
};

export type PublisherPaginate = Response<Publisher[]>;

export type PublisherList = {
    data: Publisher[]
}

export const REVENUE_SHARE ='revenue_share';
export const COMMITMENT = 'commitment';