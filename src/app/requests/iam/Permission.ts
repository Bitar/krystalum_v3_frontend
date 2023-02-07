import axios, {AxiosError, AxiosResponse} from 'axios'
import {Permission, PermissionPaginate} from '../../models/iam/Permission';
import {createFormData} from '../helpers';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/permissions`

export const getPermissions = (query?: String): Promise<PermissionPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PermissionPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getPermission = async (id: number): Promise<Permission | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePermission = async (permission: any): Promise<Permission | AxiosError | undefined> => {
    let formData = createFormData(permission);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updatePermission = async (permission: any): Promise<Permission | AxiosError | undefined> => {
    let formData = createFormData(permission);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + permission.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
