import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {Publisher} from '../../../models/supply/publisher/Publisher';
import {PublisherPayment, PublisherPaymentPaginate} from '../../../models/supply/publisher/PublisherPayment';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers`
const PAYMENTS_ENDPOINT = 'payments'

export const getPublisherPayments = (publisherId: number, query?: String): Promise<PublisherPaymentPaginate> => {
    let url = `${ENDPOINT}/${publisherId}/${PAYMENTS_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublisherPaymentPaginate>) => response.data).catch((error) => {
        return error;
    });
}


export const getPublisherPayment = async (publisher: Publisher, id: number): Promise<PublisherPayment | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publisher.id}/${PAYMENTS_ENDPOINT}`;

    return await axios.get(url + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePublisherPayment = async (publisher: Publisher, form: any): Promise<PublisherPayment | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publisher.id}/${PAYMENTS_ENDPOINT}`;

    let formData = createFormData(form);

    return await axios.post(url, formData).then(res => res.data).catch((error) => {
        return error;
    });
}

export const updatePublisherPayment = async (publisher: Publisher, id: number, publisherPayment: any): Promise<PublisherPayment | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publisher.id}/${PAYMENTS_ENDPOINT}`;

    let formData = createFormData(publisherPayment);

    formData.append('_method', 'put');

    return await axios.post(url + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
