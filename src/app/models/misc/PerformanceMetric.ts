import {Response} from '../../../_metronic/helpers';

export type PerformanceMetric = {
    id: number,
    name: string,
    title: string | null
};

export type PerformanceMetricPaginate = Response<PerformanceMetric[]>;

export type PerformanceMetricList = {
    data: PerformanceMetric[]
}