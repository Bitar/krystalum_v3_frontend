import axios, {AxiosError, AxiosResponse} from 'axios'

import {Role, RoleList, RolePaginate} from '../../models/iam/Role';
import {createFormData} from '../../helpers/requests';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/iam/roles`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllRoles = async (): Promise<RoleList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<RoleList>) => response.data).catch((error) => {
        return error;
    });
}

export const getRoles = (query?: String): Promise<RolePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<RolePaginate>) => response.data);
}

export const getRole = async (id: number): Promise<Role | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeRole = async (role: any): Promise<Role | AxiosError | undefined> => {
    let formData = createFormData(role);

    return await axios.post(ENDPOINT + '/', formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}

export const updateRole = async (id: number, role: any): Promise<Role | AxiosError | undefined> => {
    let formData = createFormData(role);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}