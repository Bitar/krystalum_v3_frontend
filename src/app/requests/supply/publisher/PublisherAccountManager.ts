import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../../helpers/requests';
import {Publisher} from '../../../models/supply/publisher/Publisher';
import {
    PublisherAccountManager,
    PublisherAccountManagerPaginate
} from '../../../models/supply/publisher/PublisherAccountManager';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers`
const ENDPOINT_ADDITION = 'account-managers'

export const getPublisherAccountManagers = (publisherId: number, query?: String): Promise<PublisherAccountManagerPaginate> => {
    let url = `${ENDPOINT}/${publisherId}/${ENDPOINT_ADDITION}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublisherAccountManagerPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const storePublisherAccountManager = async (publisher: Publisher, form: any): Promise<PublisherAccountManager | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publisher.id}/${ENDPOINT_ADDITION}`;

    let formData = createFormData(form);

    return await axios.post(url, formData).then(response => response.data.data).catch((error) => {
        return error;
    });
}