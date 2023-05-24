import {Response} from '../../../../_metronic/helpers';
import {RevenueTypeEnum} from '../../../enums/Supply/RevenueTypeEnum';
import {Tier} from '../../misc/Tier';
import {RevenueType} from '../Options';
import {Publication} from '../publication/Publication';
import {PublisherAccountManager} from './PublisherAccountManager';
import {PublisherInfo} from './PublisherInfo';

export type Publisher = {
    id: number,
    name: string,
    tier: Tier | null,
    integration_date: Date | null,
    revenueType: RevenueType,
    revenue_value: string,
    info: PublisherInfo | null,
    accountManager: PublisherAccountManager | null,
    publications: Publication[] | null
};

export type PublisherPaginate = Response<Publisher[]>;

export type PublisherList = {
    data: Publisher[]
}

