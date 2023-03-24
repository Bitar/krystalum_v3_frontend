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