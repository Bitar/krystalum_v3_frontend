import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData, ExportUrl} from '../../helpers/requests';
import {
    AdvertiserIndustry,
    AdvertiserIndustryList,
    AdvertiserIndustryPaginate
} from '../../models/misc/AdvertiserIndustry';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/advertiser-industries`

export const getAllAdvertiserIndustries = async (): Promise<AdvertiserIndustryList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<AdvertiserIndustryList>) => response.data).catch((error) => {
        return error;
    });
}

export const getAdvertiserIndustries = (query?: String): Promise<AdvertiserIndustryPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<AdvertiserIndustryPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const exportAdvertiserIndustries = async (query?: String): Promise<ExportUrl | AxiosError | undefined> => {
    let url = `${ENDPOINT}/export`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse) => response.data).catch((error) => {
        return error;
    });
}

export const getAdvertiserIndustry = async (id: number): Promise<AdvertiserIndustry | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeAdvertiserIndustry = async (advertiserIndustry: any): Promise<AdvertiserIndustry | AxiosError | undefined> => {
    let formData = createFormData(advertiserIndustry);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateAdvertiserIndustry = async (advertiserIndustry: any): Promise<AdvertiserIndustry | AxiosError | undefined> => {
    let formData = createFormData(advertiserIndustry);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + advertiserIndustry.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
