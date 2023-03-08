import {Response} from '../../../_metronic/helpers';
import {BuyingModel} from "./BuyingModel";

export type Format = {
    id: number,
    name: string,
    code: string,
    parent: Format | null,
    has_buying_model: number,
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
    has_buying_model: 0,
    buyingModels: []
};