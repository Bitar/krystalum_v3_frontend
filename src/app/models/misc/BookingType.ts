import {ID, Response} from '../../../_metronic/helpers';

export type BookingType = {
    id: ID,
    name: string
};

export type BookingTypePaginate = Response<BookingType[]>;

export type BookingTypeList = {
    data: BookingType[]
}

export const defaultBookingType: BookingType = {id: 0, name: ''};