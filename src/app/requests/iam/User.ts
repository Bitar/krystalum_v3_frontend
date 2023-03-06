import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData, ExportUrl} from '../../helpers/requests';
import {User, UserList, UserPaginate} from '../../models/iam/User';


const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/iam/users`

export const getAllUsers = async (): Promise<UserList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<UserList>) => response.data).catch((error) => {
        return error;
    });
}

export const getUsers = (query?: String): Promise<UserPaginate> => {
    let url = `${ENDPOINT}`

    if (query) {
        url += `?${query}`
    }

    return axios.get(url).then((response: AxiosResponse<UserPaginate>) => response.data)
}

export const exportUsers = async (query?: String): Promise<ExportUrl | AxiosError | undefined> => {
    let url = `${ENDPOINT}/export`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse) => response.data).catch((error) => {
        return error;
    });
}

export const getUser = async (id: number): Promise<User | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const updateUser = async (user: any): Promise<User | AxiosError | undefined> => {
    let formData = createFormData(user);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + user.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}

export const storeUser = async (user: any): Promise<User | AxiosError | undefined> => {
    let formData = createFormData(user);

    return await axios.post(ENDPOINT + '/', formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
