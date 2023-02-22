import {ID, Response} from '../../../_metronic/helpers';

export type BusinessUnit = {
    id: ID,
    name: string
};

export type BusinessUnitPaginate = Response<BusinessUnit[]>;

export type BusinessUnitList = {
    data: BusinessUnit[]
}

export const defaultBusinessUnit: BusinessUnit = {id: 0, name: ""};