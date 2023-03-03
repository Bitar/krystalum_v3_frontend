import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData, ExportUrl} from '../../helpers/requests';
import {Vertical, VerticalList, VerticalPaginate} from '../../models/misc/Vertical';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/verticals`

export const getAllVerticals = async (): Promise<VerticalList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<VerticalList>) => response.data).catch((error) => {
        return error;
    });
}

export const exportVerticals = async (query?: String): Promise<ExportUrl | AxiosError | undefined> => {
    let url = `${ENDPOINT}/export`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse) => response.data).catch((error) => {
        return error;
    });
}

export const getVerticals = (query?: String): Promise<VerticalPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<VerticalPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getVertical = async (id: number): Promise<Vertical | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeVertical = async (vertical: any): Promise<Vertical | AxiosError | undefined> => {
    let formData = createFormData(vertical);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateVertical = async (vertical: any): Promise<Vertical | AxiosError | undefined> => {
    let formData = createFormData(vertical);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + vertical.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
