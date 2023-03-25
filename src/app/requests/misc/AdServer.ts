import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../helpers/requests';
import {AdServer, AdServerList, AdServerPaginate} from '../../models/misc/AdServer';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/ad-servers`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllAdServers = async (): Promise<AdServerList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<AdServerList>) => response.data).catch((error) => {
        return error;
    });
}

export const getAdServers = (query?: String): Promise<AdServerPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<AdServerPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getAdServer = async (id: number): Promise<AdServer | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeAdServer = async (adServer: any): Promise<AdServer | AxiosError | undefined> => {
    let formData = createFormData(adServer);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateAdServer = async (id: number, adServer: any): Promise<AdServer | AxiosError | undefined> => {
    let formData = createFormData(adServer);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
