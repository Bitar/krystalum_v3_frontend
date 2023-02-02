import axios, {AxiosResponse} from 'axios'
import {PermissionPaginate} from '../../models/iam/Permission';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/permissions`

export const getPermissions = (query?: String): Promise<PermissionPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PermissionPaginate>) => response.data);
}
