import axios, {AxiosResponse} from 'axios'
import {RolePaginate} from '../../models/iam/Role';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/roles`

export const getRoles = (query?: String): Promise<RolePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<RolePaginate>) => response.data);
}
