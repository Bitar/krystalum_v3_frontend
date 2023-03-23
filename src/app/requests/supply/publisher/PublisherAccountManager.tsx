import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {
    PublisherAccountManager,
    PublisherAccountManagerPaginate
} from '../../../models/supply/publisher/PublisherAccountManager';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers/account-managers`

export const getPublisherAccountManagers = (query?: String): Promise<PublisherAccountManagerPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublisherAccountManagerPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const storePublisherAccountManager = async (publisher: any, form: any): Promise<PublisherAccountManager | AxiosError | undefined> => {
    let formData = createFormData(form);

    return await axios.post(ENDPOINT + '/' + publisher.id, formData).then(res => res.data).catch((error) => {
        return error;
    });
}