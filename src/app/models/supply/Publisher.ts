import {Response} from '../../../_metronic/helpers';
import {Tier} from '../misc/Tier';

export type Publisher = {
    id: number,
    name: string,
    tier: Tier | null,
    integration_date: string,
    revenue_type: number,
    revenue_share: number | null,
    commitment: string | null
};

export type PublisherPaginate = Response<Publisher[]>;

export type PublisherList = {
    data: Publisher[]
}

export const defaultPublisher: Publisher = {
    id: 0,
    name: '',
    tier: null,
    integration_date: '',
    revenue_type: 0,
    revenue_share: null,
    commitment: ''
};

export const REVENUE_SHARE = 1;
export const COMMITMENT = 2;