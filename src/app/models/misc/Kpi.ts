import {Response} from '../../../_metronic/helpers';
import {PerformanceMetric} from './PerformanceMetric';

export type Kpi = {
    id: number,
    name: string,
    is_rate: number,
    is_conversion: number,
    performanceMetrics: PerformanceMetric[]
};

export type KpiPaginate = Response<Kpi[]>;

export type KpiList = {
    data: Kpi[]
}

export const defaultKpi: Kpi = {
    id: 0,
    name: "",
    is_rate: 1,
    is_conversion: 0,
    performanceMetrics: []
};