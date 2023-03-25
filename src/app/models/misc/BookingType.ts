import {Response} from '../../../_metronic/helpers';

export type BookingType = {
    id: number,
    name: string,
    code: string
};

export type BookingTypePaginate = Response<BookingType[]>;

export type BookingTypeList = {
    data: BookingType[]
}