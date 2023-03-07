import {Response} from '../../../_metronic/helpers';

export type OperatingSystem = {
    id: number,
    name: string
};

export type OperatingSystemPaginate = Response<OperatingSystem[]>;

export type OperatingSystemList = {
    data: OperatingSystem[]
}

export const defaultOperatingSystem: OperatingSystem = {id: 0, name: ''};