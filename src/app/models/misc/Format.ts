import {Response} from '../../../_metronic/helpers';
import {PerformanceMetric} from "./PerformanceMetric";
import {BuyingModel} from "./BuyingModel";

export type Format = {
    id: number,
    name: string,
    code: string,
    parent: Format | null,
    buyingModels: BuyingModel[]
};

export type FormatPaginate = Response<Format[]>;

export type FormatList = {
    data: Format[]
}

export const defaultFormat: Format = {
    id: 0,
    name: '',
    code: '',
    parent: null,
    buyingModels: []
};