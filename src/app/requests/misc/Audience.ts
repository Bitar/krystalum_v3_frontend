import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {Audience, AudienceList, AudiencePaginate} from '../../models/misc/Audience';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/audiences`

export const getAllAudiences = async (): Promise<AudienceList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<AudienceList>) => response.data).catch((error) => {
        return error;
    });
}

export const getAudiences = (query?: String): Promise<AudiencePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<AudiencePaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getAudience = async (id: number): Promise<Audience | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeAudience = async (audience: any): Promise<Audience | AxiosError | undefined> => {
    let formData = createFormData(audience);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateAudience = async (audience: any): Promise<Audience | AxiosError | undefined> => {
    let formData = createFormData(audience);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + audience.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
