import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData, ExportUrl} from '../../helpers/requests';
import {OperatingSystem, OperatingSystemList, OperatingSystemPaginate} from '../../models/misc/OperatingSystem';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/operating-systems`

export const getAllOperatingSystems = async (): Promise<OperatingSystemList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<OperatingSystemList>) => response.data).catch((error) => {
        return error;
    });
}

export const getOperatingSystems = (query?: String): Promise<OperatingSystemPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<OperatingSystemPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const exportOperatingSystems = async (query?: String): Promise<ExportUrl | AxiosError | undefined> => {
    let url = `${ENDPOINT}/export`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse) => response.data).catch((error) => {
        return error;
    });
}

export const getOperatingSystem = async (id: number): Promise<OperatingSystem | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeOperatingSystem = async (operatingSystem: any): Promise<OperatingSystem | AxiosError | undefined> => {
    let formData = createFormData(operatingSystem);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateOperatingSystem = async (operatingSystem: any): Promise<OperatingSystem | AxiosError | undefined> => {
    let formData = createFormData(operatingSystem);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + operatingSystem.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}