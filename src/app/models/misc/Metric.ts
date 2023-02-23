import {ID, Response} from '../../../_metronic/helpers';

export type Metric = {
    id: ID,
    name: string
};

export type MetricPaginate = Response<Metric[]>;

export type MetricList = {
    data: Metric[]
}

export const defaultMetric: Metric = {id: 0, name: ''};