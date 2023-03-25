import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {BookingType, BookingTypeList, BookingTypePaginate} from '../../models/misc/BookingType';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/booking-types`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllBookingTypes = async (): Promise<BookingTypeList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<BookingTypeList>) => response.data).catch((error) => {
        return error;
    });
}

export const getBookingTypes = (query?: String): Promise<BookingTypePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<BookingTypePaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getBookingType = async (id: number): Promise<BookingType | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeBookingType = async (bookingType: any): Promise<BookingType | AxiosError | undefined> => {
    let formData = createFormData(bookingType);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateBookingType = async (id: number, bookingType: any): Promise<BookingType | AxiosError | undefined> => {
    let formData = createFormData(bookingType);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
