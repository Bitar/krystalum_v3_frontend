import {Response} from '../../../_metronic/helpers';

export type Device = {
    id: number,
    name: string
};

export type DevicePaginate = Response<Device[]>;

export type DeviceList = {
    data: Device[]
}