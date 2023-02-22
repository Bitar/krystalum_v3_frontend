import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {Technology, TechnologyList, TechnologyPaginate} from '../../models/misc/Technology';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/technologies`

export const getAllTechnologies = async (): Promise<TechnologyList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<TechnologyList>) => response.data).catch((error) => {
        return error;
    });
}

export const getTechnologies = (query?: String): Promise<TechnologyPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<TechnologyPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getTechnology = async (id: number): Promise<Technology | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeTechnology = async (technology: any): Promise<Technology | AxiosError | undefined> => {
    let formData = createFormData(technology);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateTechnology = async (technology: any): Promise<Technology | AxiosError | undefined> => {
    let formData = createFormData(technology);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + technology.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
