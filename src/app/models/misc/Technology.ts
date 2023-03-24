import {Response} from '../../../_metronic/helpers';

export type Technology = {
    id: number,
    name: string
};

export type TechnologyPaginate = Response<Technology[]>;

export type TechnologyList = {
    data: Technology[]
}