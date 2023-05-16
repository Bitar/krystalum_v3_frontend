import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {Publication} from '../../../models/supply/publication/Publication';
import {PublicationAdServer, PublicationAdServerPaginate} from '../../../models/supply/publication/PublicationAdServer';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const AD_SERVERS_ENDPOINT = 'ad-servers'

export const getPublicationAdServers = (publicationId: number, query?: String): Promise<PublicationAdServerPaginate> => {
    let url = `${ENDPOINT}/${publicationId}/${AD_SERVERS_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublicationAdServerPaginate>) => response.data).catch((error) => {
        return error;
    });
}


export const getPublicationAdServer = async (publication: Publication, id: number): Promise<PublicationAdServer | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${AD_SERVERS_ENDPOINT}`;

    return await axios.get(url + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePublicationAdServer = async (publication: Publication, form: any): Promise<Publication | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${AD_SERVERS_ENDPOINT}`;

    let formData = createFormData(form);

    return await axios.post(url, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}

export const updatePublicationAdServer = async (publication: Publication, id: number, publicationAdServer: any): Promise<PublicationAdServer | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${AD_SERVERS_ENDPOINT}`;

    let formData = createFormData(publicationAdServer);

    formData.append('_method', 'put');

    return await axios.post(url + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
