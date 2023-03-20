import {Response} from '../../../_metronic/helpers';
import {defaultRegion, Region} from '../misc/Region';
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

export const defaultAgency: Agency = {id: 0, name: '', region: defaultRegion, holdingGroup: null};