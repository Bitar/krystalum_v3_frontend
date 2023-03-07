import {Response} from '../../../_metronic/helpers';

export type BuyingModel = {
    id: number,
    name: string
};

export type BuyingModelPaginate = Response<BuyingModel[]>;

export type BuyingModelList = {
    data: BuyingModel[]
}

export const defaultBuyingModel: BuyingModel = {id: 0, name: ''};