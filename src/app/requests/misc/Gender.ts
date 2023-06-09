import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {Gender, GenderList, GenderPaginate} from '../../models/misc/Gender';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/genders`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllGenders = async (): Promise<Gender[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<GenderList>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getGenders = (query?: String): Promise<GenderPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<GenderPaginate>) => response.data);
}

export const getGender = async (id: number): Promise<Gender | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeGender = async (gender: any): Promise<Gender | AxiosError | undefined> => {
    let formData = createFormData(gender);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateGender = async (id: number, gender: any): Promise<Gender | AxiosError | undefined> => {
    let formData = createFormData(gender);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
