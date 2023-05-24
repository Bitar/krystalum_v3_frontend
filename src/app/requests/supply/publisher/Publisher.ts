import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../../helpers/requests';
import {Publisher, PublisherList, PublisherPaginate} from '../../../models/supply/publisher/Publisher';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers`

export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;
export const ARCHIVED_EXPORT_ENDPOINT = `${ENDPOINT}/export`;
export const INCLUDES = 'include[]=tier&include[]=info&include[]=accountManager&include[]=publications';

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
            url += `${INCLUDES}`;
        } else {
            url += `&${INCLUDES}`;
        }
    } else {
        url += `?${INCLUDES}`
    }

    url += `&filter[is_archived]=0`

    return axios.get(url).then((response: AxiosResponse<PublisherPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getArchivedPublishers = (query?: String): Promise<PublisherPaginate> => {
    let url = `${ENDPOINT}/archived`;

    if (query) {
        url += `?${query}`;

        if (query.charAt(query.length - 1) === '&') {
            url += `${INCLUDES}`;
        } else {
            url += `&${INCLUDES}`;
        }
    } else {
        url += `?${INCLUDES}`
    }

    return axios.get(url).then((response: AxiosResponse<PublisherPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getPublisher = async (id: number): Promise<Publisher | AxiosError | undefined> => {
    return await axios.get(`${ENDPOINT}/${id}?${INCLUDES}`)
        .then(response => response.data.data).catch((error) => {
            return error;
        });
}

export const storePublisher = async (publisher: any): Promise<Publisher | AxiosError | undefined> => {
    let formData = createFormData(publisher);

    return await axios.post(ENDPOINT + '/', formData)
        .then(response => response.data.data)
        .catch((error) => {
            return error;
        });
}

export const updatePublisher = async (id: number, publisher: any): Promise<Publisher | AxiosError | undefined> => {
    let formData = createFormData(publisher);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(response => response.data.data).catch((error) => {
        return error;
    });
}

