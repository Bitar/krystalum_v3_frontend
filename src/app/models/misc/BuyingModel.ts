import {Response} from '../../../_metronic/helpers';
import {PerformanceMetric} from "./PerformanceMetric";

export type BuyingModelCondensed = {
    id: number,
    name: string
}

export type BuyingModel = {
    id: number,
    name: string,
    performanceMetrics: PerformanceMetric[]
};

export type BuyingModelPaginate = Response<BuyingModel[]>;

export type BuyingModelList = {
    data: BuyingModel[]
}