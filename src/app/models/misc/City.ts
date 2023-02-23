import {ID, Response} from '../../../_metronic/helpers';
import {Country, defaultCountry} from './Country';

export type City = {
    id: ID,
    name: string,
    country: Country
};

export type CityPaginate = Response<City[]>;

export type CityList = {
    data: City[]
}

export const defaultCity: City = {id: 0, name: '', country: defaultCountry};