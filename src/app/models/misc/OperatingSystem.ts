import {ID, Response} from '../../../_metronic/helpers';

export type OperatingSystem = {
    id: ID,
    name: string
};

export type OperatingSystemPaginate = Response<OperatingSystem[]>;

export type OperatingSystemList = {
    data: OperatingSystem[]
}

export const defaultOperatingSystem: OperatingSystem = {id: 0, name: ''};