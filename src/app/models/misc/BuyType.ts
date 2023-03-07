import {Response} from '../../../_metronic/helpers';

export type BuyType = {
    id: number,
    name: string,
    code: string
};

export type BuyTypePaginate = Response<BuyType[]>;

export type BuyTypeList = {
    data: BuyType[]
}

export const defaultBuyType: BuyType = {id: 0, name: '', code: ''};