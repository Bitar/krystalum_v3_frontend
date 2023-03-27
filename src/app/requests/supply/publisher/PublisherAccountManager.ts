import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {
    PublisherAccountManager,
    PublisherAccountManagerPaginate
} from '../../../models/supply/publisher/PublisherAccountManager';
import {Publisher} from '../../../models/supply/publisher/Publisher';
import {UserList} from '../../../models/iam/User';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers`
const ACCOUNT_MANAGERS_ENDPOINT = 'account-managers'

export const getAccountManagers = async (publisher?: Publisher): Promise<UserList | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${ACCOUNT_MANAGERS_ENDPOINT}/users/`

    if (publisher)
        url += `${publisher.id}`

    return axios.get(url).then((response: AxiosResponse<UserList>) => response.data).catch((error) => {
        return error;
    });
}

export const getPublisherAccountManagers = (publisherId: number, query?: String): Promise<PublisherAccountManagerPaginate> => {
    let url = `${ENDPOINT}/${publisherId}/${ACCOUNT_MANAGERS_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublisherAccountManagerPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const storePublisherAccountManager = async (publisher: Publisher, form: any): Promise<PublisherAccountManager | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publisher.id}/${ACCOUNT_MANAGERS_ENDPOINT}`;

    let formData = createFormData(form);

    return await axios.post(url, formData).then(res => res.data).catch((error) => {
        return error;
    });
}