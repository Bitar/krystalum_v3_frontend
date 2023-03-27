import {Region, RegionList, RegionPaginate} from '../../models/misc/Region'
import axios, {AxiosError, AxiosResponse} from 'axios';
import {createFormData} from '../../helpers/requests';

const API_URL = process.env.REACT_APP_API_URL;
const ENDPOINT = `${API_URL}/misc/regions`;
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllRegions = async (): Promise<RegionList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<RegionList>) => response.data).catch((error) => {
        return error;
    });
}

export const getRegion = async (id: number): Promise<Region | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const getRegions = (query ?: String): Promise<RegionPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<RegionPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const storeRegion = async (region: any): Promise<Region | AxiosError | undefined> => {
    let formData = createFormData(region);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}


export const updateRegion = async (id: number, region: any): Promise<Region | AxiosError | undefined> => {
    let formData = createFormData(region);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}