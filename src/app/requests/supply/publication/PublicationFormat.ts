import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {Publication} from '../../../models/supply/publication/Publication';
import {PublicationFormat, PublicationFormatPaginate} from '../../../models/supply/publication/PublicationFormat';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const FORMATS_ENDPOINT = 'formats'

export const getPublicationFormats = (publicationId: number, query?: String): Promise<PublicationFormatPaginate> => {
    let url = `${ENDPOINT}/${publicationId}/${FORMATS_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublicationFormatPaginate>) => response.data).catch((error) => {
        return error;
    });
}


export const getPublicationFormat = async (publication: Publication, id: number): Promise<PublicationFormat | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${FORMATS_ENDPOINT}`;

    return await axios.get(url + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePublicationFormat = async (publication: Publication, form: any): Promise<PublicationFormat | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${FORMATS_ENDPOINT}`;

    let formData = createFormData(form);

    return await axios.post(url, formData).then(res => res.data).catch((error) => {
        return error;
    });
}

export const updatePublicationFormat = async (publication: Publication, id: number, publicationFormat: any): Promise<PublicationFormat | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${FORMATS_ENDPOINT}`;

    let formData = createFormData(publicationFormat);

    formData.append('_method', 'put');

    return await axios.post(url + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
