import {Response} from '../../../_metronic/helpers';

export type TradingDesk = {
    id: number,
    name: string
};

export type TradingDeskPaginate = Response<TradingDesk[]>;

export type TradingDeskList = {
    data: TradingDesk[]
}

export const defaultTradingDesk: TradingDesk = {id: 0, name: ""};