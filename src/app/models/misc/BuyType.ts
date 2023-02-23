import {ID, Response} from '../../../_metronic/helpers';

export type BuyType = {
    id: ID,
    name: string,
    code: string
};

export type BuyTypePaginate = Response<BuyType[]>;

export type BuyTypeList = {
    data: BuyType[]
}

export const defaultBuyType: BuyType = {id: 0, name: '', code: ''};