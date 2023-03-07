import {Response} from '../../../_metronic/helpers';

export type Technology = {
    id: number,
    name: string
};

export type TechnologyPaginate = Response<Technology[]>;

export type TechnologyList = {
    data: Technology[]
}

export const defaultTechnology: Technology = {id: 0, name: ""};