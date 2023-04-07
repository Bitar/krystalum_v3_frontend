import {Response} from '../../../../_metronic/helpers';
import {Tier} from '../../misc/Tier';
import {PublisherInfo} from './PublisherInfo';
import {PublisherAccountManager} from './PublisherAccountManager';
import {REVENUE_TYPE} from '../Options';

export type Publisher = {
    id: number,
    name: string,
    tier: Tier | null,
    integration_date: Date | null,
    revenue_type: REVENUE_TYPE,
    revenue_value: string,
    info: PublisherInfo | null,
    accountManager: PublisherAccountManager | null
};

export type PublisherCondensed = {
    id: number,
    name: string
};

export type PublisherPaginate = Response<Publisher[]>;

export type PublisherList = {
    data: Publisher[]
}

