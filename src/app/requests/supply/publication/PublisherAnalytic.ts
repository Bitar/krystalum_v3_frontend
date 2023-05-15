import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {
    PublicationAnalytic,
    PublicationAnalyticPaginate
} from '../../../models/supply/publication/PublicationAnalytic';
import {Publication} from '../../../models/supply/publication/Publication';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const ANALYTICS_ENDPOINT = 'analytics'

export const getPublicationAnalytics = (publicationId: number, query?: String): Promise<PublicationAnalyticPaginate> => {
    let url = `${ENDPOINT}/${publicationId}/${ANALYTICS_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublicationAnalyticPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getPublicationAnalyticsUniqueUsers = (publicationId: number): Promise<PublicationAnalyticPaginate> => {
    let url = `${ENDPOINT}/${publicationId}/${ANALYTICS_ENDPOINT}`;

    url += `?type=unique_users`;

    return axios.get(url).then((response: AxiosResponse<PublicationAnalyticPaginate>) => response.data).catch((error) => {
        return error;
    });
}


export const getPublicationAnalytic = async (publication: Publication, id: number): Promise<PublicationAnalytic | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${ANALYTICS_ENDPOINT}`;

    return await axios.get(url + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePublicationAnalytic = async (publication: Publication, form: any): Promise<PublicationAnalytic | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${ANALYTICS_ENDPOINT}`;

    let formData = createFormData(form);

    return await axios.post(url, formData).then(res => res.data).catch((error) => {
        return error;
    });
}

export const updatePublicationAnalytic = async (publication: Publication, id: number, publicationAnalytic: any): Promise<PublicationAnalytic | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${ANALYTICS_ENDPOINT}`;

    let formData = createFormData(publicationAnalytic);

    formData.append('_method', 'put');

    return await axios.post(url + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}