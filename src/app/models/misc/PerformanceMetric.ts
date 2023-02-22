import {ID, Response} from '../../../_metronic/helpers';

export type PerformanceMetric = {
    id: ID,
    name: string
};

export type PerformanceMetricPaginate = Response<PerformanceMetric[]>;

export type PerformanceMetricList = {
    data: PerformanceMetric[]
}

export const defaultPerformanceMetric: PerformanceMetric = {id: 0, name: ""};