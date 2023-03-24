import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {
    PublisherAccountManager,
    PublisherAccountManagerPaginate
} from '../../../models/supply/publisher/PublisherAccountManager';
import {Publisher} from '../../../models/supply/publisher/Publisher';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers/`
const ACCOUNT_MANAGER_ENDPOINT = '/account-managers'

export const getPublisherAccountManagers = (publisher: Publisher | null, query?: String): Promise<PublisherAccountManagerPaginate> => {
    let url = `${ENDPOINT}${publisher?.id}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url + ACCOUNT_MANAGER_ENDPOINT).then((response: AxiosResponse<PublisherAccountManagerPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const storePublisherAccountManager = async (publisher: Publisher | null, form: any): Promise<PublisherAccountManager | AxiosError | undefined> => {
    let formData = createFormData(form);

    return await axios.post(ENDPOINT + publisher?.id + ACCOUNT_MANAGER_ENDPOINT, formData).then(res => res.data).catch((error) => {
        return error;
    });
}