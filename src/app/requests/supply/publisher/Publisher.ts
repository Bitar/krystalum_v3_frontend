import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {Publisher, PublisherList, PublisherPaginate} from '../../../models/supply/publisher/Publisher';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers`

const relations = 'include[]=tier&include[]=info&include[]=accountManager'

export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllPublishers = async (): Promise<PublisherList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<PublisherList>) => response.data).catch((error) => {
        return error;
    });
}

export const getPublishers = (query?: String): Promise<PublisherPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
        if (query.charAt(query.length - 1) === '&') {
            url += relations;
        } else {
            url += `&${relations}`;
        }
    } else {
        url += `?${relations}`
    }

    return axios.get(url).then((response: AxiosResponse<PublisherPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getPublisher = async (id: number): Promise<Publisher | AxiosError | undefined> => {
    return await axios.get(`${ENDPOINT}/${id}?${relations}`)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePublisher = async (publisher: any): Promise<Publisher | AxiosError | undefined> => {
    let formData = createFormData(publisher);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updatePublisher = async (publisher: any): Promise<Publisher | AxiosError | undefined> => {
    let formData = createFormData(publisher);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + publisher.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}

