import {ID, Response} from '../../../_metronic/helpers';

export type Device = {
    id: ID,
    name: string
};

export type DevicePaginate = Response<Device[]>;

export type DeviceList = {
    data: Device[]
}

export const defaultDevice: Device = {id: 0, name: ''};