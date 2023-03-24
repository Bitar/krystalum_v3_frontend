import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {OperatingSystem, OperatingSystemList, OperatingSystemPaginate} from '../../models/misc/OperatingSystem';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/operating-systems`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

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
            return error;
        });
}

export const updateOperatingSystem = async (id: number, operatingSystem: any): Promise<OperatingSystem | AxiosError | undefined> => {
    let formData = createFormData(operatingSystem);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
