import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {PublisherContact, PublisherContactPaginate} from '../../../models/supply/publisher/PublisherContact';
import {Publisher} from '../../../models/supply/publisher/Publisher';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers`
const CONTACTS_ENDPOINT = 'contacts'

export const getPublisherContacts = (publisherId: number, query?: String): Promise<PublisherContactPaginate> => {
    let url = `${ENDPOINT}/${publisherId}/${CONTACTS_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublisherContactPaginate>) => response.data).catch((error) => {
        return error;
    });
}


export const getPublisherContact = async (publisher: Publisher, id: number): Promise<PublisherContact | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publisher.id}/${CONTACTS_ENDPOINT}`;

    return await axios.get(url + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePublisherContact = async (publisher: Publisher, form: any): Promise<PublisherContact | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publisher.id}/${CONTACTS_ENDPOINT}`;

    let formData = createFormData(form);

    return await axios.post(url, formData).then(res => res.data).catch((error) => {
        return error;
    });
}

export const updatePublisherContact = async (publisher: Publisher, id: number, publisherContact: any): Promise<PublisherContact | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publisher.id}/${CONTACTS_ENDPOINT}`;

    let formData = createFormData(publisherContact);

    formData.append('_method', 'put');

    return await axios.post(url + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
