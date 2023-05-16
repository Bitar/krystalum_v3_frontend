import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {Publication} from '../../../models/supply/publication/Publication';
import {
    PublicationMinimumEcpm,
    PublicationMinimumEcpmPaginate
} from '../../../models/supply/publication/PublicationMinimumEcpm';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const MINIMUM_ECPMS_ENDPOINT = 'minimum-ecpms'

export const getPublicationMinimumEcpms = (publicationId: number, query?: String): Promise<PublicationMinimumEcpmPaginate> => {
    let url = `${ENDPOINT}/${publicationId}/${MINIMUM_ECPMS_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublicationMinimumEcpmPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getPublicationMinimumEcpm = async (publication: Publication, id: number): Promise<PublicationMinimumEcpm | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${MINIMUM_ECPMS_ENDPOINT}`;

    return await axios.get(url + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePublicationMinimumEcpm = async (publication: Publication, form: any): Promise<PublicationMinimumEcpm | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${MINIMUM_ECPMS_ENDPOINT}`;

    let formData = createFormData(form);

    return await axios.post(url, formData).then(res => res.data).catch((error) => {
        return error;
    });
}

export const updatePublicationMinimumEcpm = async (publication: Publication, id: number, publicationMinimumEcpm: any): Promise<PublicationMinimumEcpm | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${MINIMUM_ECPMS_ENDPOINT}`;

    let formData = createFormData(publicationMinimumEcpm);

    formData.append('_method', 'put');

    return await axios.post(url + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
