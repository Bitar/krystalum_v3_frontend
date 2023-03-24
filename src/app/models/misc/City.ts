import {Response} from '../../../_metronic/helpers';
import {Country} from './Country';

export type City = {
    id: number,
    name: string,
    country: Country
};

export type CityPaginate = Response<City[]>;

export type CityList = {
    data: City[]
}