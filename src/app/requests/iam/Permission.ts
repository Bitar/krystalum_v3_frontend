import axios, {AxiosError, AxiosResponse} from 'axios'
import {Permission, PermissionList, PermissionPaginate} from '../../models/iam/Permission';
import {createFormData, ExportUrl} from '../../helpers/requests';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/iam/permissions`

export const getAllPermissions = async (): Promise<PermissionList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<PermissionList>) => response.data).catch((error) => {
        return error;
    });
}

export const getPermissions = (query?: String): Promise<PermissionPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PermissionPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const exportPermissions = async (query?: String): Promise<ExportUrl | AxiosError | undefined> => {
    let url = `${ENDPOINT}/export`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse) => response.data).catch((error) => {
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
