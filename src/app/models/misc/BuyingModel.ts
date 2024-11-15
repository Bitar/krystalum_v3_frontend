import {Response} from '../../../_metronic/helpers';
import {PerformanceMetric} from "./PerformanceMetric";

export type BuyingModel = {
    id: number,
    name: string,
    performanceMetrics: PerformanceMetric[]
};

export type BuyingModelPaginate = Response<BuyingModel[]>;

export type BuyingModelList = {
    data: BuyingModel[]
}