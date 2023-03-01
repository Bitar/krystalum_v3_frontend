import {ID, Response} from '../../../_metronic/helpers';

export type City = {
    id: ID,
    name: string,
    country: ID
};

export type CityPaginate = Response<City[]>;

export type CityList = {
    data: City[]
}

export const defaultCity: City = {id: 0, name: '', country: 0};