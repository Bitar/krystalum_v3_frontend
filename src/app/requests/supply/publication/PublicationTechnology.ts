import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {Publication} from '../../../models/supply/publication/Publication';
import {PublicationTechnology, PublicationTechnologyPaginate} from '../../../models/supply/publication/PublicationTechnology';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const TECHNOLOGIES_ENDPOINT = 'technologies'

export const getPublicationTechnologies = (publicationId: number, query?: String): Promise<PublicationTechnologyPaginate> => {
    let url = `${ENDPOINT}/${publicationId}/${TECHNOLOGIES_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublicationTechnologyPaginate>) => response.data).catch((error) => {
        return error;
    });
}


export const getPublicationTechnology = async (publication: Publication, id: number): Promise<PublicationTechnology | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${TECHNOLOGIES_ENDPOINT}`;

    return await axios.get(url + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePublicationTechnology = async (publication: Publication, form: any): Promise<Publication | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${TECHNOLOGIES_ENDPOINT}`;

    let formData = createFormData(form);

    return await axios.post(url, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}

export const updatePublicationTechnology = async (publication: Publication, id: number, publicationTechnology: any): Promise<PublicationTechnology | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${TECHNOLOGIES_ENDPOINT}`;

    let formData = createFormData(publicationTechnology);

    formData.append('_method', 'put');

    return await axios.post(url + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
