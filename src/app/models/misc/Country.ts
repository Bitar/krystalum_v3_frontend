import {Response} from '../../../_metronic/helpers';

export type Country = {
    id: number,
    name: string,
    code: string,
    currency: string,
    phone_code?: string
};

export type CountryPaginate = Response<Country[]>;

export type CountryList = {
    data: Country[]
}

export const defaultCountry: Country = {id: 0, name: '', code: '', currency: '', phone_code: ''};