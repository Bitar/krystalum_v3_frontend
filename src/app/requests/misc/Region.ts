import {Region, RegionList, RegionPaginate, TypeList} from "../../models/misc/Region"
import axios, {AxiosError, AxiosResponse} from "axios";
import {createFormData, ExportUrl} from "../../helpers/requests";

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/regions`


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

export const getAllRegions = async (): Promise<RegionList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<RegionList>) => response.data).catch((error) => {
        return error;
    });
}
export const exportRegions = async (query ?: String): Promise<ExportUrl | AxiosError | undefined> => {

    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse) => response.data).catch((error) => {
        return error;
    });

}

export const storeRegion = async (region: any): Promise<Region | AxiosError | undefined> => {
    let formData = createFormData(region);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const getTypes = async (): Promise<TypeList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/types').then((response: AxiosResponse<TypeList>) => response.data).catch((error) => {
        return error;
    });
}