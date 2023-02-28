import {ID, Response} from '../../../_metronic/helpers';
import {PerformanceMetric} from './PerformanceMetric';

export type Kpi = {
    id: ID,
    name: string,
    is_rate: boolean,
    is_conversion: boolean,
    performanceMetrics: PerformanceMetric[]
};

export type KpiPaginate = Response<Kpi[]>;

export type KpiList = {
    data: Kpi[]
}

export const defaultKpi: Kpi = {
    id: 0,
    name: "",
    is_rate: false,
    is_conversion: false,
    performanceMetrics: []
};