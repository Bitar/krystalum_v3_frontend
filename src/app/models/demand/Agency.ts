import {Response} from '../../../_metronic/helpers';
import {Region} from '../misc/Region';
import {HoldingGroup} from './HoldingGroup';

export type Agency = {
    id: number,
    name: string,
    region: Region,
    holdingGroup: HoldingGroup | null
};


export type AgencyPaginate = Response<Agency[]>;

export type AgencyList = {
    data: Agency[]
}