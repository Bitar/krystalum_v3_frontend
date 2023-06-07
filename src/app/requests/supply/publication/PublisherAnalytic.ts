import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../../helpers/requests';
import {Publication} from '../../../models/supply/publication/Publication';
import {PublicationAnalytic, PublicationAnalyticPaginate} from '../../../models/supply/publication/PublicationAnalytic';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const ENDPOINT_ADDITION = 'analytics'

export const getPublicationAnalytics = (publicationId: number, query?: String): Promise<PublicationAnalyticPaginate> => {
    let url = `${ENDPOINT}/${publicationId}/${ENDPOINT_ADDITION}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublicationAnalyticPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getPublicationAnalytic = async (publication: Publication, id: number): Promise<PublicationAnalytic | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`;

    return await axios.get(url + '/' + id)
        .then(response => response.data.data).catch((error) => {
            return error;
        });
}

export const storePublicationAnalytic = async (publication: Publication, form: any): Promise<PublicationAnalytic | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`;

    let formData = createFormData(form);

    return await axios.post(url, formData).then(response => response.data).catch((error) => {
        return error;
    });
}

export const updatePublicationAnalytic = async (publication: Publication, id: number, publicationAnalytic: any): Promise<PublicationAnalytic | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`;

    let formData = createFormData(publicationAnalytic);

    formData.append('_method', 'put');

    return await axios.post(url + '/' + id, formData).then(response => response.data.data).catch((error) => {
        return error;
    });
}
