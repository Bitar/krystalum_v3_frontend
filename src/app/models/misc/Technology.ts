import {ID, Response} from '../../../_metronic/helpers';

export type Technology = {
    id: ID,
    name: string
};

export type TechnologyPaginate = Response<Technology[]>;

export type TechnologyList = {
    data: Technology[]
}

export const defaultTechnology: Technology = {id: 0, name: ""};