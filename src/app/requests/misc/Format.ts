import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../helpers/requests';
import {Format, FormatList, FormatPaginate} from '../../models/misc/Format';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/formats`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllFormats = async (): Promise<FormatList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<FormatList>) => response.data).catch((error) => {
        return error;
    });
}


export const getFormats = (query?: String): Promise<FormatPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<FormatPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getFormat = async (id: number): Promise<Format | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeFormat = async (format: any): Promise<Format | AxiosError | undefined> => {
    let formData = createFormData(format);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateFormat = async (format: any): Promise<Format | AxiosError | undefined> => {
    let formData = createFormData(format);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + format.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
