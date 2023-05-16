import {Response} from '../../../_metronic/helpers';

export type Currency = {
    id: number,
    currency: string
};

export type CurrencyPaginate = Response<Currency[]>;

export type CurrencyList = {
    data: Currency[]
}

export const defaultCurrency: Currency = {id: 0, currency: ''};
export const usdCurrency: Currency = {id: 236, currency: 'USD (United States)'};


