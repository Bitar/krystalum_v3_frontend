import axios, {AxiosResponse} from 'axios'

import {PublicationPaginate} from '../../../models/supply/publication/Publication';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers`
const PUBLICATIONS_ENDPOINT = 'publications'

export const getPublisherPublications = (publisherId: number, query?: String): Promise<PublicationPaginate> => {
    let url = `${ENDPOINT}/${publisherId}/${PUBLICATIONS_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublicationPaginate>) => response.data).catch((error) => {
        return error;
    });
}