import {ID, Response} from '../../../_metronic/helpers';

export type BuyingModel = {
    id: ID,
    name: string
};

export type BuyingModelPaginate = Response<BuyingModel[]>;

export type BuyingModelList = {
    data: BuyingModel[]
}

export const defaultBuyingModel: BuyingModel = {id: 0, name: ''};