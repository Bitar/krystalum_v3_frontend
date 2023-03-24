import {Response} from '../../../_metronic/helpers';

export type Tier = {
    id: number,
    name: string,
    order: number
};

export type TierPaginate = Response<Tier[]>;

export type TierList = {
    data: Tier[]
}