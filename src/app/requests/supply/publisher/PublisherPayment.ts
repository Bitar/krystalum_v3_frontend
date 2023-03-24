import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {PublisherPayment, PublisherPaymentPaginate} from '../../../models/supply/publisher/PublisherPayment';
import {Publisher} from '../../../models/supply/publisher/Publisher';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers/`
const PAYMENT_ENDPOINT = '/payments'

export const getPublisherPayments = (publisher: Publisher | null, query?: String): Promise<PublisherPaymentPaginate> => {
    let url = `${ENDPOINT}${publisher?.id}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url + PAYMENT_ENDPOINT).then((response: AxiosResponse<PublisherPaymentPaginate>) => response.data).catch((error) => {
        return error;
    });
}
export const storePublisherPayment = async (publisher: Publisher | null, form: any): Promise<PublisherPayment | AxiosError | undefined> => {
    let formData = createFormData(form);

    return await axios.post(ENDPOINT + publisher?.id + PAYMENT_ENDPOINT, formData).then(res => res.data).catch((error) => {
        return error;
    });
}