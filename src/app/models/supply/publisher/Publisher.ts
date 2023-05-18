import {Response} from '../../../../_metronic/helpers';
import {REVENUE_TYPE} from '../../../enums/Supply/RevenueType';
import {Tier} from '../../misc/Tier';
import {Publication} from '../publication/Publication';
import {PublisherAccountManager} from './PublisherAccountManager';
import {PublisherInfo} from './PublisherInfo';

export type Publisher = {
    id: number,
    name: string,
    tier: Tier | null,
    integration_date: Date | null,
    revenue_type: REVENUE_TYPE,
    revenue_value: string,
    info: PublisherInfo | null,
    accountManager: PublisherAccountManager | null,
    publications: Publication[] | null
};

export type PublisherCondensed = {
    id: number,
    name: string
};

export type PublisherPaginate = Response<Publisher[]>;

export type PublisherList = {
    data: Publisher[]
}

