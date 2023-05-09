import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {Publication} from '../../../models/supply/publication/Publication';
import {PublicationVertical, PublicationVerticalPaginate} from '../../../models/supply/publication/PublicationVertical';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const VERTICALS_ENDPOINT = 'verticals'

export const getPublicationVerticals = (publicationId: number, query?: String): Promise<PublicationVerticalPaginate> => {
    let url = `${ENDPOINT}/${publicationId}/${VERTICALS_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublicationVerticalPaginate>) => response.data).catch((error) => {
        return error;
    });
}


export const getPublicationVertical = async (publication: Publication, id: number): Promise<PublicationVertical | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${VERTICALS_ENDPOINT}`;

    return await axios.get(url + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePublicationVertical = async (publication: Publication, form: any): Promise<PublicationVertical | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${VERTICALS_ENDPOINT}`;

    let formData = createFormData(form);

    return await axios.post(url, formData).then(res => res.data).catch((error) => {
        return error;
    });
}

export const updatePublicationVertical = async (publication: Publication, id: number, publicationVertical: any): Promise<PublicationVertical | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${VERTICALS_ENDPOINT}`;

    let formData = createFormData(publicationVertical);

    formData.append('_method', 'put');

    return await axios.post(url + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
