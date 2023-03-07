import {Response} from '../../../_metronic/helpers';

export type Gender = {
    id: number,
    name: string
};

export type GenderPaginate = Response<Gender[]>;

export type GenderList = {
    data: Gender[]
}

export const defaultGender: Gender = {id: 0, name: ''};