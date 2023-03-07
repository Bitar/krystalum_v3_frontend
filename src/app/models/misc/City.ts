import {Response} from '../../../_metronic/helpers';
import {Country, defaultCountry} from './Country';

export type City = {
    id: number,
    name: string,
    country: Country
};

export type CityPaginate = Response<City[]>;

export type CityList = {
    data: City[]
}

export const defaultCity: City = {id: 0, name: '', country: defaultCountry};