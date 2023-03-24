import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {
    ContactTypeList,
    PublisherContact,
    PublisherContactPaginate
} from '../../../models/supply/publisher/PublisherContact';
import {Publisher} from '../../../models/supply/publisher/Publisher';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers/`
const CONTACTS_ENDPOINT = '/contacts'

export const getContactTypes = async (publisher: Publisher|null): Promise<ContactTypeList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + publisher?.id + CONTACTS_ENDPOINT + '/types').then((response: AxiosResponse<ContactTypeList>) => response.data).catch((error) => {
        return error;
    });
}
export const getPublisherContacts = (publisherId: number, query?: String): Promise<PublisherContactPaginate> => {
    let url = `${ENDPOINT}${publisherId}${CONTACTS_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublisherContactPaginate>) => response.data).catch((error) => {
        return error;
    });
}
export const storePublisherContact = async (publisher: Publisher|null, form: any): Promise<PublisherContact | AxiosError | undefined> => {
    let formData = createFormData(form);

    return await axios.post(ENDPOINT + publisher?.id + CONTACTS_ENDPOINT, formData).then(res => res.data).catch((error) => {
        return error;
    });
}