import {Response} from '../../../_metronic/helpers';

export type Publisher = {
    id: number,
    name: string
};

export type PublisherPaginate = Response<Publisher[]>;

export type PublisherList = {
    data: Publisher[]
}

export const defaultPublisher: Publisher = {id: 0, name: ""};