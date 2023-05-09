import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../../helpers/requests';
import {Publication} from '../../../models/supply/publication/Publication';
import {PublicationAdTechnology, PublicationAdTechnologyPaginate} from '../../../models/supply/publication/PublicationAdTechnology';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const AD_TECHNOLOGIES_ENDPOINT = 'ad-technologies'

export const getPublicationAdTechnologies = (publicationId: number, query?: String): Promise<PublicationAdTechnologyPaginate> => {
    let url = `${ENDPOINT}/${publicationId}/${AD_TECHNOLOGIES_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublicationAdTechnologyPaginate>) => response.data).catch((error) => {
        return error;
    });
}