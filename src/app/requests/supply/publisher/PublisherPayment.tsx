import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {PublisherPayment, PublisherPaymentPaginate} from '../../../models/supply/publisher/PublisherPayment';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers/payments`

export const getPublisherPayments = (query?: String): Promise<PublisherPaymentPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublisherPaymentPaginate>) => response.data).catch((error) => {
        return error;
    });
}
export const storePublisherPayment = async (publisher: any, form: any): Promise<PublisherPayment | AxiosError | undefined> => {
    let formData = createFormData(form);

    return await axios.post(ENDPOINT + '/' + publisher.id, formData).then(res => res.data).catch((error) => {
        return error;
    });
}